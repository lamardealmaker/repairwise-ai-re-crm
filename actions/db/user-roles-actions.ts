"use server"

import { db } from "@/db/db"
import { propertiesTable, userRolesTable, organizationsTable } from "@/db/schema"
import {
  ActionState,
  CreateUserRoleInput,
  UserRole,
  UserRoleWithDetails
} from "@/types"
import { eq, and } from "drizzle-orm"

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