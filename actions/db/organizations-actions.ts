"use server"

import { db } from "@/db/db"
import { organizationsTable, userRolesTable } from "@/db/schema"
import { ActionState, CreateOrganizationInput, Organization } from "@/types"
import { auth } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"

export async function createOrganizationAction(
  input: CreateOrganizationInput
): Promise<ActionState<Organization>> {
  try {
    const authData = await auth()
    const userId = authData.userId

    if (!userId) {
      return {
        isSuccess: false,
        message: "You must be logged in to create an organization"
      }
    }

    // Create the organization
    const [organization] = await db
      .insert(organizationsTable)
      .values({
        name: input.name
      })
      .returning()

    // Assign the creator as an admin
    await db.insert(userRolesTable).values({
      userId,
      orgId: organization.id,
      role: "ADMIN"
    })

    return {
      isSuccess: true,
      message: "Organization created successfully",
      data: organization as Organization
    }
  } catch (error) {
    console.error("Error creating organization:", error)
    return { isSuccess: false, message: "Failed to create organization" }
  }
}

export async function getOrganizationAction(
  id: string
): Promise<ActionState<Organization>> {
  try {
    const [organization] = await db
      .select()
      .from(organizationsTable)
      .where(eq(organizationsTable.id, id))

    if (!organization) {
      return {
        isSuccess: false,
        message: "Organization not found"
      }
    }

    return {
      isSuccess: true,
      message: "Organization retrieved successfully",
      data: organization as Organization
    }
  } catch (error) {
    console.error("Error getting organization:", error)
    return { isSuccess: false, message: "Failed to get organization" }
  }
}

export async function updateOrganizationAction(
  id: string,
  input: Partial<CreateOrganizationInput>
): Promise<ActionState<Organization>> {
  try {
    const [organization] = await db
      .update(organizationsTable)
      .set(input)
      .where(eq(organizationsTable.id, id))
      .returning()

    return {
      isSuccess: true,
      message: "Organization updated successfully",
      data: organization as Organization
    }
  } catch (error) {
    console.error("Error updating organization:", error)
    return { isSuccess: false, message: "Failed to update organization" }
  }
}

export async function deleteOrganizationAction(
  id: string
): Promise<ActionState<void>> {
  try {
    await db.delete(organizationsTable).where(eq(organizationsTable.id, id))

    return {
      isSuccess: true,
      message: "Organization deleted successfully",
      data: undefined
    }
  } catch (error) {
    console.error("Error deleting organization:", error)
    return { isSuccess: false, message: "Failed to delete organization" }
  }
}

export async function getUserOrganizationsAction(): Promise<ActionState<Organization[]>> {
  try {
    const authData = await auth()
    const userId = authData.userId

    if (!userId) {
      return {
        isSuccess: false,
        message: "You must be logged in to get organizations"
      }
    }

    const organizations = await db
      .select({
        id: organizationsTable.id,
        name: organizationsTable.name,
        createdAt: organizationsTable.createdAt,
        updatedAt: organizationsTable.updatedAt
      })
      .from(organizationsTable)
      .innerJoin(userRolesTable, eq(userRolesTable.orgId, organizationsTable.id))
      .where(eq(userRolesTable.userId, userId))

    return {
      isSuccess: true,
      message: "Organizations retrieved successfully",
      data: organizations as Organization[]
    }
  } catch (error) {
    console.error("Error getting organizations:", error)
    return { isSuccess: false, message: "Failed to get organizations" }
  }
}

export async function hasOrganizationsAction(): Promise<ActionState<boolean>> {
  try {
    const { data: organizations } = await getUserOrganizationsAction()
    return {
      isSuccess: true,
      message: "Organizations check completed",
      data: organizations ? organizations.length > 0 : false
    }
  } catch (error) {
    console.error("Error checking organizations:", error)
    return { isSuccess: false, message: "Failed to check organizations" }
  }
} 