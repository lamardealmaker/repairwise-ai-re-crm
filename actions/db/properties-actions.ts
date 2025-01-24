"use server"

import { db } from "@/db/db"
import { propertiesTable, userRolesTable } from "@/db/schema"
import { ActionState, CreatePropertyInput, Property, UserRole } from "@/types"
import { eq } from "drizzle-orm"

export async function createPropertyAction(
  input: CreatePropertyInput
): Promise<ActionState<Property>> {
  try {
    // Create the property
    const [property] = await db
      .insert(propertiesTable)
      .values({
        orgId: input.orgId,
        name: input.name
      })
      .returning()

    return {
      isSuccess: true,
      message: "Property created successfully",
      data: property as Property
    }
  } catch (error) {
    console.error("Error creating property:", error)
    return { isSuccess: false, message: "Failed to create property" }
  }
}

export async function createPropertyWithStaffAction(
  input: CreatePropertyInput,
  staffUserIds: string[]
): Promise<ActionState<Property>> {
  try {
    // Create the property
    const [property] = await db
      .insert(propertiesTable)
      .values({
        orgId: input.orgId,
        name: input.name
      })
      .returning()

    // If there are staff members to assign
    if (staffUserIds.length > 0) {
      // Create user roles for each staff member
      const userRoles = staffUserIds.map((userId) => ({
        userId,
        orgId: input.orgId,
        propertyId: property.id,
        role: "EMPLOYEE" as const
      }))

      await db.insert(userRolesTable).values(userRoles)
    }

    return {
      isSuccess: true,
      message: "Property created and staff assigned successfully",
      data: property as Property
    }
  } catch (error) {
    console.error("Error creating property with staff:", error)
    return { isSuccess: false, message: "Failed to create property with staff" }
  }
}

export async function getPropertyAction(
  id: string
): Promise<ActionState<Property>> {
  try {
    const [property] = await db
      .select()
      .from(propertiesTable)
      .where(eq(propertiesTable.id, id))

    if (!property) {
      return {
        isSuccess: false,
        message: "Property not found"
      }
    }

    return {
      isSuccess: true,
      message: "Property retrieved successfully",
      data: property as Property
    }
  } catch (error) {
    console.error("Error getting property:", error)
    return { isSuccess: false, message: "Failed to get property" }
  }
}

export async function updatePropertyAction(
  id: string,
  input: Partial<CreatePropertyInput>
): Promise<ActionState<Property>> {
  try {
    const [property] = await db
      .update(propertiesTable)
      .set(input)
      .where(eq(propertiesTable.id, id))
      .returning()

    return {
      isSuccess: true,
      message: "Property updated successfully",
      data: property as Property
    }
  } catch (error) {
    console.error("Error updating property:", error)
    return { isSuccess: false, message: "Failed to update property" }
  }
}

export async function deletePropertyAction(
  id: string
): Promise<ActionState<void>> {
  try {
    await db.delete(propertiesTable).where(eq(propertiesTable.id, id))

    return {
      isSuccess: true,
      message: "Property deleted successfully",
      data: undefined
    }
  } catch (error) {
    console.error("Error deleting property:", error)
    return { isSuccess: false, message: "Failed to delete property" }
  }
}

export async function getPropertiesForOrgAction(
  orgId: string
): Promise<ActionState<Property[]>> {
  try {
    const properties = await db
      .select()
      .from(propertiesTable)
      .where(eq(propertiesTable.orgId, orgId))

    return {
      isSuccess: true,
      message: "Properties retrieved successfully",
      data: properties as Property[]
    }
  } catch (error) {
    console.error("Error getting properties:", error)
    return { isSuccess: false, message: "Failed to get properties" }
  }
} 