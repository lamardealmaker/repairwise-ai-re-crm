"use server"

import { db } from "@/db/db"
import { propertiesTable, userRolesTable, organizationsTable, usersTable } from "@/db/schema"
import {
  ActionState,
  CreateUserRoleInput,
  UserRole,
  UserRoleWithDetails
} from "@/types"
import { eq, and, inArray } from "drizzle-orm"

export async function assignUserRoleAction(
  input: CreateUserRoleInput
): Promise<ActionState<UserRole>> {
  try {
    const [userRole] = await db
      .insert(userRolesTable)
      .values({
        userId: input.userId,
        orgId: input.orgId,
        propertyId: input.propertyId,
        role: input.role
      })
      .returning()

    return {
      isSuccess: true,
      message: "Role assigned successfully",
      data: userRole as UserRole
    }
  } catch (error) {
    console.error("Error assigning role:", error)
    return { isSuccess: false, message: "Failed to assign role" }
  }
}

export async function assignUserToAllPropertiesAction(
  input: Omit<CreateUserRoleInput, "propertyId">
): Promise<ActionState<UserRole[]>> {
  try {
    // Get all properties for the org
    const properties = await db
      .select()
      .from(propertiesTable)
      .where(eq(propertiesTable.orgId, input.orgId))

    if (properties.length === 0) {
      return {
        isSuccess: false,
        message: "No properties found for this organization"
      }
    }

    // Create user roles for each property
    const userRoles = properties.map((property) => ({
      userId: input.userId,
      orgId: input.orgId,
      propertyId: property.id,
      role: input.role
    }))

    const createdRoles = await db
      .insert(userRolesTable)
      .values(userRoles)
      .returning()

    return {
      isSuccess: true,
      message: "User assigned to all properties successfully",
      data: createdRoles as UserRole[]
    }
  } catch (error) {
    console.error("Error assigning user to all properties:", error)
    return {
      isSuccess: false,
      message: "Failed to assign user to all properties"
    }
  }
}

export async function removeUserRoleAction(
  id: string
): Promise<ActionState<void>> {
  try {
    await db.delete(userRolesTable).where(eq(userRolesTable.id, id))

    return {
      isSuccess: true,
      message: "Role removed successfully",
      data: undefined
    }
  } catch (error) {
    console.error("Error removing role:", error)
    return { isSuccess: false, message: "Failed to remove role" }
  }
}

export async function getUserRolesAction(
  userId: string
): Promise<ActionState<UserRoleWithDetails[]>> {
  try {
    const userRoles = await db
      .select({
        id: userRolesTable.id,
        userId: userRolesTable.userId,
        orgId: userRolesTable.orgId,
        propertyId: userRolesTable.propertyId,
        role: userRolesTable.role,
        createdAt: userRolesTable.createdAt,
        organization: {
          id: organizationsTable.id,
          name: organizationsTable.name
        },
        property: {
          id: propertiesTable.id,
          name: propertiesTable.name
        }
      })
      .from(userRolesTable)
      .leftJoin(
        organizationsTable,
        eq(userRolesTable.orgId, organizationsTable.id)
      )
      .leftJoin(
        propertiesTable,
        eq(userRolesTable.propertyId, propertiesTable.id)
      )
      .where(eq(userRolesTable.userId, userId))

    return {
      isSuccess: true,
      message: "User roles retrieved successfully",
      data: userRoles as UserRoleWithDetails[]
    }
  } catch (error) {
    console.error("Error getting user roles:", error)
    return { isSuccess: false, message: "Failed to get user roles" }
  }
}

export async function getUserOrgIdAction(
  userId: string
): Promise<ActionState<string | undefined>> {
  try {
    const [userRole] = await db
      .select({
        orgId: userRolesTable.orgId
      })
      .from(userRolesTable)
      .where(eq(userRolesTable.userId, userId))
      .limit(1)

    if (!userRole) {
      return {
        isSuccess: false,
        message: "No organization found for user"
      }
    }

    return {
      isSuccess: true,
      message: "Organization ID retrieved successfully",
      data: userRole.orgId
    }
  } catch (error) {
    console.error("Error getting user organization:", error)
    return { isSuccess: false, message: "Failed to get user organization" }
  }
}

export async function getStaffMembersAction(
  orgId: string
): Promise<ActionState<UserRoleWithDetails[]>> {
  try {
    // First get all staff roles
    const allRoles = await db
      .select({
        id: userRolesTable.id,
        userId: userRolesTable.userId,
        orgId: userRolesTable.orgId,
        propertyId: userRolesTable.propertyId,
        role: userRolesTable.role,
        createdAt: userRolesTable.createdAt,
        user: {
          id: usersTable.id,
          email: usersTable.email,
          fullName: usersTable.fullName,
          role: usersTable.role
        },
        property: {
          id: propertiesTable.id,
          name: propertiesTable.name
        }
      })
      .from(userRolesTable)
      .leftJoin(usersTable, eq(userRolesTable.userId, usersTable.id))
      .leftJoin(propertiesTable, eq(userRolesTable.propertyId, propertiesTable.id))
      .where(
        and(
          eq(userRolesTable.orgId, orgId),
          inArray(userRolesTable.role, ["ADMIN", "EMPLOYEE", "MAINTENANCE"])
        )
      )

    // Create a map to store highest role per user and property combination
    const userPropertyMap = new Map<string, typeof allRoles[0]>()

    // Helper function to determine role priority
    function getRolePriority(role: string): number {
      switch (role) {
        case "ADMIN":
          return 3
        case "EMPLOYEE":
          return 2
        case "MAINTENANCE":
          return 1
        default:
          return 0
      }
    }

    // Process all roles to keep only the highest role per user and property combination
    allRoles.forEach(role => {
      const key = `${role.userId}-${role.propertyId || 'all'}`
      const existingRole = userPropertyMap.get(key)
      if (!existingRole || getRolePriority(role.role) > getRolePriority(existingRole.role)) {
        userPropertyMap.set(key, role)
      }
    })

    // Convert map back to array
    const staffMembers = Array.from(userPropertyMap.values())

    return {
      isSuccess: true,
      message: "Staff members retrieved successfully",
      data: staffMembers as UserRoleWithDetails[]
    }
  } catch (error) {
    console.error("Error getting staff members:", error)
    return { isSuccess: false, message: "Failed to get staff members" }
  }
}

export async function updateUserRoleAndInfoAction(
  roleId: string,
  data: {
    role: "ADMIN" | "EMPLOYEE" | "MAINTENANCE"
    email: string
    fullName: string | null
  }
): Promise<ActionState<UserRoleWithDetails>> {
  try {
    // Get the user role to find the userId
    const [userRole] = await db
      .select()
      .from(userRolesTable)
      .where(eq(userRolesTable.id, roleId))

    if (!userRole) {
      return {
        isSuccess: false,
        message: "User role not found"
      }
    }

    // Update user info
    await db
      .update(usersTable)
      .set({
        email: data.email,
        fullName: data.fullName
      })
      .where(eq(usersTable.id, userRole.userId))

    // Update role
    const [updatedRole] = await db
      .update(userRolesTable)
      .set({
        role: data.role
      })
      .where(eq(userRolesTable.id, roleId))
      .returning()

    // Get updated user role with details
    const [updatedUserRole] = await db
      .select({
        id: userRolesTable.id,
        userId: userRolesTable.userId,
        orgId: userRolesTable.orgId,
        propertyId: userRolesTable.propertyId,
        role: userRolesTable.role,
        createdAt: userRolesTable.createdAt,
        user: {
          id: usersTable.id,
          email: usersTable.email,
          fullName: usersTable.fullName,
          role: usersTable.role
        }
      })
      .from(userRolesTable)
      .leftJoin(usersTable, eq(userRolesTable.userId, usersTable.id))
      .where(eq(userRolesTable.id, roleId))

    return {
      isSuccess: true,
      message: "User role and info updated successfully",
      data: updatedUserRole as UserRoleWithDetails
    }
  } catch (error) {
    console.error("Error updating user role and info:", error)
    return { isSuccess: false, message: "Failed to update user role and info" }
  }
}

export async function getUserPropertyIdAction(
  userId: string
): Promise<ActionState<string | undefined>> {
  try {
    const [userRole] = await db
      .select({
        propertyId: userRolesTable.propertyId
      })
      .from(userRolesTable)
      .where(
        and(
          eq(userRolesTable.userId, userId),
          eq(userRolesTable.role, "TENANT")
        )
      )
      .limit(1)

    if (!userRole?.propertyId) {
      return {
        isSuccess: false,
        message: "No property found for user"
      }
    }

    return {
      isSuccess: true,
      message: "Property ID retrieved successfully",
      data: userRole.propertyId
    }
  } catch (error) {
    console.error("Error getting user property:", error)
    return { isSuccess: false, message: "Failed to get user property" }
  }
} 