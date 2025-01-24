"use server"

import { db } from "@/db/db"
import { invitesTable, userRolesTable, organizationsTable, propertiesTable, usersTable } from "@/db/schema"
import {
  ActionState,
  CreateInviteInput,
  Invite,
  InviteWithDetails
} from "@/types"
import { auth } from "@clerk/nextjs/server"
import { and, eq } from "drizzle-orm"
import { nanoid } from "nanoid"
import { sendInviteEmail } from "@/lib/resend"

export async function createInviteAction(
  input: CreateInviteInput
): Promise<ActionState<{ invite: Invite; inviteLink: string }>> {
  try {
    const authData = await auth()
    const userId = authData.userId

    if (!userId) {
      return {
        isSuccess: false,
        message: "You must be logged in to create an invite"
      }
    }

    // Validate property requirement for tenants
    if (input.role === "TENANT" && !input.propertyId) {
      return {
        isSuccess: false,
        message: "Property is required for tenant invites"
      }
    }

    const token = nanoid()
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + (input.expiresInDays || 7))

    // Get organization name for the email
    const [organization] = await db
      .select({
        name: organizationsTable.name
      })
      .from(organizationsTable)
      .where(eq(organizationsTable.id, input.orgId))

    if (!organization) {
      return {
        isSuccess: false,
        message: "Organization not found"
      }
    }

    const [invite] = await db
      .insert(invitesTable)
      .values({
        email: input.email,
        orgId: input.orgId,
        propertyId: input.propertyId,
        role: input.role,
        token,
        expiresAt,
        invitedByUserId: userId
      })
      .returning()

    const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/invite/${token}`

    // Send invite email
    const emailResult = await sendInviteEmail({
      email: input.email,
      inviteLink,
      organizationName: organization.name,
      role: input.role
    })

    if (!emailResult.success) {
      // If email fails, delete the invite and return error
      await db.delete(invitesTable).where(eq(invitesTable.id, invite.id))
      return {
        isSuccess: false,
        message: "Failed to send invite email"
      }
    }

    return {
      isSuccess: true,
      message: "Invite sent successfully",
      data: {
        invite: invite as Invite,
        inviteLink
      }
    }
  } catch (error) {
    console.error("Error creating invite:", error)
    return { isSuccess: false, message: "Failed to create invite" }
  }
}

export async function getInviteByTokenAction(
  token: string
): Promise<ActionState<InviteWithDetails>> {
  try {
    const [invite] = await db
      .select({
        id: invitesTable.id,
        email: invitesTable.email,
        orgId: invitesTable.orgId,
        propertyId: invitesTable.propertyId,
        role: invitesTable.role,
        token: invitesTable.token,
        status: invitesTable.status,
        expiresAt: invitesTable.expiresAt,
        invitedByUserId: invitesTable.invitedByUserId,
        createdAt: invitesTable.createdAt,
        organization: {
          id: organizationsTable.id,
          name: organizationsTable.name
        },
        property: {
          id: propertiesTable.id,
          name: propertiesTable.name
        },
        invitedBy: {
          id: usersTable.id,
          fullName: usersTable.fullName,
          email: usersTable.email
        }
      })
      .from(invitesTable)
      .leftJoin(
        organizationsTable,
        eq(invitesTable.orgId, organizationsTable.id)
      )
      .leftJoin(
        propertiesTable,
        eq(invitesTable.propertyId, propertiesTable.id)
      )
      .leftJoin(
        usersTable,
        eq(invitesTable.invitedByUserId, usersTable.id)
      )
      .where(eq(invitesTable.token, token))

    if (!invite) {
      return {
        isSuccess: false,
        message: "Invite not found"
      }
    }

    return {
      isSuccess: true,
      message: "Invite retrieved successfully",
      data: invite as InviteWithDetails
    }
  } catch (error) {
    console.error("Error getting invite:", error)
    return { isSuccess: false, message: "Failed to get invite" }
  }
}

export async function acceptInviteAction(
  token: string
): Promise<ActionState<void>> {
  try {
    const authData = await auth()
    const userId = authData.userId

    if (!userId) {
      return {
        isSuccess: false,
        message: "You must be logged in to accept an invite"
      }
    }

    // Get the invite
    const [invite] = await db
      .select()
      .from(invitesTable)
      .where(
        and(
          eq(invitesTable.token, token),
          eq(invitesTable.status, "PENDING")
        )
      )

    if (!invite) {
      return {
        isSuccess: false,
        message: "Invalid or expired invite"
      }
    }

    if (invite.expiresAt < new Date()) {
      // Update invite status to expired
      await db
        .update(invitesTable)
        .set({ status: "EXPIRED" })
        .where(eq(invitesTable.id, invite.id))

      return {
        isSuccess: false,
        message: "This invite has expired"
      }
    }

    // Create user role
    await db.insert(userRolesTable).values({
      userId,
      orgId: invite.orgId,
      propertyId: invite.propertyId,
      role: invite.role
    })

    // Update invite status
    await db
      .update(invitesTable)
      .set({ status: "ACCEPTED" })
      .where(eq(invitesTable.id, invite.id))

    return {
      isSuccess: true,
      message: "Invite accepted successfully",
      data: undefined
    }
  } catch (error) {
    console.error("Error accepting invite:", error)
    return { isSuccess: false, message: "Failed to accept invite" }
  }
}

export async function cancelInviteAction(
  id: string
): Promise<ActionState<void>> {
  try {
    await db
      .update(invitesTable)
      .set({ status: "CANCELED" })
      .where(eq(invitesTable.id, id))

    return {
      isSuccess: true,
      message: "Invite canceled successfully",
      data: undefined
    }
  } catch (error) {
    console.error("Error canceling invite:", error)
    return { isSuccess: false, message: "Failed to cancel invite" }
  }
}

export async function getInvitesAction(
  orgId: string
): Promise<ActionState<InviteWithDetails[]>> {
  try {
    const invites = await db
      .select({
        id: invitesTable.id,
        email: invitesTable.email,
        orgId: invitesTable.orgId,
        propertyId: invitesTable.propertyId,
        role: invitesTable.role,
        token: invitesTable.token,
        status: invitesTable.status,
        expiresAt: invitesTable.expiresAt,
        invitedByUserId: invitesTable.invitedByUserId,
        createdAt: invitesTable.createdAt,
        organization: {
          id: organizationsTable.id,
          name: organizationsTable.name
        },
        property: {
          id: propertiesTable.id,
          name: propertiesTable.name
        },
        invitedBy: {
          id: usersTable.id,
          fullName: usersTable.fullName,
          email: usersTable.email
        }
      })
      .from(invitesTable)
      .leftJoin(
        organizationsTable,
        eq(invitesTable.orgId, organizationsTable.id)
      )
      .leftJoin(
        propertiesTable,
        eq(invitesTable.propertyId, propertiesTable.id)
      )
      .leftJoin(
        usersTable,
        eq(invitesTable.invitedByUserId, usersTable.id)
      )
      .where(eq(invitesTable.orgId, orgId))

    return {
      isSuccess: true,
      message: "Invites retrieved successfully",
      data: invites as InviteWithDetails[]
    }
  } catch (error) {
    console.error("Error getting invites:", error)
    return { isSuccess: false, message: "Failed to get invites" }
  }
} 