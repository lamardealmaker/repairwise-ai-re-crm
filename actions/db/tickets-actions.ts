"use server"

import { db } from "@/db/db"
import { InsertTicket, SelectTicket, ticketsTable } from "@/db/schema"
import { ActionState } from "@/types"
import { and, eq } from "drizzle-orm"

export async function createTicketAction(
  ticket: InsertTicket
): Promise<ActionState<SelectTicket>> {
  try {
    const [newTicket] = await db.insert(ticketsTable).values(ticket).returning()
    return {
      isSuccess: true,
      message: "Ticket created successfully",
      data: newTicket
    }
  } catch (error) {
    console.error("Error creating ticket:", error)
    return { isSuccess: false, message: "Failed to create ticket" }
  }
}

export async function getTicketsByTenantAction(
  tenantId: string
): Promise<ActionState<SelectTicket[]>> {
  try {
    const tickets = await db
      .select()
      .from(ticketsTable)
      .where(eq(ticketsTable.tenantId, tenantId))
      .orderBy(ticketsTable.createdAt)
    return {
      isSuccess: true,
      message: "Tickets retrieved successfully",
      data: tickets
    }
  } catch (error) {
    console.error("Error getting tickets:", error)
    return { isSuccess: false, message: "Failed to get tickets" }
  }
}

export async function getTicketByIdAction(
  id: string,
  tenantId?: string
): Promise<ActionState<SelectTicket | undefined>> {
  try {
    const conditions = tenantId
      ? and(eq(ticketsTable.id, id), eq(ticketsTable.tenantId, tenantId))
      : eq(ticketsTable.id, id)

    const [ticket] = await db
      .select()
      .from(ticketsTable)
      .where(conditions)

    return {
      isSuccess: true,
      message: "Ticket retrieved successfully",
      data: ticket
    }
  } catch (error) {
    console.error("Error getting ticket:", error)
    return { isSuccess: false, message: "Failed to get ticket" }
  }
}

export async function updateTicketAction(
  id: string,
  data: Partial<InsertTicket>
): Promise<ActionState<SelectTicket>> {
  try {
    const [updatedTicket] = await db
      .update(ticketsTable)
      .set(data)
      .where(eq(ticketsTable.id, id))
      .returning()

    return {
      isSuccess: true,
      message: "Ticket updated successfully",
      data: updatedTicket
    }
  } catch (error) {
    console.error("Error updating ticket:", error)
    return { isSuccess: false, message: "Failed to update ticket" }
  }
}

export async function deleteTicketAction(id: string): Promise<ActionState<void>> {
  try {
    await db.delete(ticketsTable).where(eq(ticketsTable.id, id))
    return {
      isSuccess: true,
      message: "Ticket deleted successfully",
      data: undefined
    }
  } catch (error) {
    console.error("Error deleting ticket:", error)
    return { isSuccess: false, message: "Failed to delete ticket" }
  }
} 