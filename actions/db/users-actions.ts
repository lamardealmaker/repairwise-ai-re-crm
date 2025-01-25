"use server"

import { db } from "@/db/db"
import { InsertUser, SelectUser, usersTable, userRoleEnum } from "@/db/schema"
import { ActionState } from "@/types"
import { eq } from "drizzle-orm"
import { clerkClient } from "@clerk/nextjs/server"

// Retry logic for Clerk operations
async function syncWithClerk(userId: string, role: typeof userRoleEnum.enumValues[number], maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const clerk = await clerkClient()
      await clerk.users.updateUser(userId, {
        publicMetadata: { role }
      })
      return true
    } catch (error) {
      console.error(`Clerk sync attempt ${i + 1} failed:`, error)
      if (i === maxRetries - 1) throw error
      // Exponential backoff
      await new Promise(r => setTimeout(r, 1000 * Math.pow(2, i)))
    }
  }
  return false
}

export async function createUserAction(
  user: InsertUser
): Promise<ActionState<SelectUser>> {
  try {
    // Use transaction to ensure atomic operation
    const [newUser] = await db.transaction(async (tx) => {
      // Create user in database
      const [dbUser] = await tx
        .insert(usersTable)
        .values(user)
        .returning()

      // Attempt to sync with Clerk
      if (user.clerkId && user.role) {
        try {
          await syncWithClerk(user.clerkId, user.role)
        } catch (error) {
          console.error("Failed to sync role with Clerk:", error)
          // Don't roll back the transaction, just log the error
        }
      }

      return [dbUser]
    })

    return {
      isSuccess: true,
      message: "User created successfully",
      data: newUser
    }
  } catch (error) {
    console.error("Error creating user:", error)
    return { isSuccess: false, message: "Failed to create user" }
  }
}

export async function getUserByClerkIdAction(
  clerkId: string
): Promise<ActionState<SelectUser | undefined>> {
  try {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.clerkId, clerkId))

    // If user exists, verify role sync with Clerk
    if (user) {
      try {
        const clerk = await clerkClient()
        const clerkUser = await clerk.users.getUser(clerkId)
        const clerkRole = clerkUser.publicMetadata?.role as typeof userRoleEnum.enumValues[number]

        // If roles are out of sync, update Clerk
        if (clerkRole !== user.role) {
          await syncWithClerk(clerkId, user.role)
        }
      } catch (error) {
        console.error("Error verifying Clerk role:", error)
        // Continue even if Clerk verification fails
      }
    }

    return {
      isSuccess: true,
      message: "User retrieved successfully",
      data: user
    }
  } catch (error) {
    console.error("Error getting user:", error)
    return { isSuccess: false, message: "Failed to get user" }
  }
}

export async function updateUserAction(
  id: string,
  data: Partial<InsertUser>
): Promise<ActionState<SelectUser>> {
  try {
    // Use transaction for atomic update
    const [updatedUser] = await db.transaction(async (tx) => {
      const [user] = await tx
        .update(usersTable)
        .set(data)
        .where(eq(usersTable.id, id))
        .returning()

      // If role is being updated, sync with Clerk
      if (data.role && user.clerkId) {
        try {
          await syncWithClerk(user.clerkId, data.role)
        } catch (error) {
          console.error("Failed to sync role with Clerk:", error)
          // Don't roll back the transaction, just log the error
        }
      }

      return [user]
    })

    return {
      isSuccess: true,
      message: "User updated successfully",
      data: updatedUser
    }
  } catch (error) {
    console.error("Error updating user:", error)
    return { isSuccess: false, message: "Failed to update user" }
  }
}

export async function updateUserRoleAction(
  clerkId: string,
  role: typeof userRoleEnum.enumValues[number]
): Promise<ActionState<SelectUser>> {
  try {
    // Use transaction for atomic role update
    const [updatedUser] = await db.transaction(async (tx) => {
      const [user] = await tx
        .update(usersTable)
        .set({ role })
        .where(eq(usersTable.clerkId, clerkId))
        .returning()

      if (!user) {
        throw new Error("User not found")
      }

      // Sync with Clerk
      try {
        await syncWithClerk(clerkId, role)
      } catch (error) {
        console.error("Failed to sync role with Clerk:", error)
        // Don't roll back the transaction, just log the error
      }

      return [user]
    })

    return {
      isSuccess: true,
      message: "User role updated successfully",
      data: updatedUser
    }
  } catch (error) {
    console.error("Error updating user role:", error)
    return { isSuccess: false, message: "Failed to update user role" }
  }
}

export async function deleteUserAction(id: string): Promise<ActionState<void>> {
  try {
    const [user] = await db
      .select({ clerkId: usersTable.clerkId })
      .from(usersTable)
      .where(eq(usersTable.id, id))

    await db.transaction(async (tx) => {
      // Delete from database
      await tx.delete(usersTable).where(eq(usersTable.id, id))

      // If user exists in Clerk, try to delete or update metadata
      if (user?.clerkId) {
        try {
          const clerk = await clerkClient()
          await clerk.users.updateUser(user.clerkId, {
            publicMetadata: { role: null }
          })
        } catch (error) {
          console.error("Failed to update Clerk metadata:", error)
          // Don't roll back the transaction, just log the error
        }
      }
    })

    return {
      isSuccess: true,
      message: "User deleted successfully",
      data: undefined
    }
  } catch (error) {
    console.error("Error deleting user:", error)
    return { isSuccess: false, message: "Failed to delete user" }
  }
} 