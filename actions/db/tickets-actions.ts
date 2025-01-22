"use server"

import { db } from "@/db/db"
import { InsertTicket, SelectTicket, ticketsTable } from "@/db/schema"
import { ActionState } from "@/types"
import { and, eq, desc } from "drizzle-orm"

export async function createTicketAction(
  ticket: InsertTicket
): Promise<ActionState<SelectTicket>> {
  try {
    console.log("Creating ticket in database:", ticket)
    const [newTicket] = await db.insert(ticketsTable).values(ticket).returning()
    console.log("Successfully created ticket:", newTicket)
    return {
      isSuccess: true,
      message: "Ticket created successfully",
      data: newTicket
    }
  } catch (error) {
    console.error("Error creating ticket:", {
      error,
      errorMessage: error instanceof Error ? error.message : "Unknown error",
      errorStack: error instanceof Error ? error.stack : undefined,
      ticket
    })
    return { 
      isSuccess: false, 
      message: error instanceof Error 
        ? `Database error: ${error.message}`
        : "Failed to create ticket" 
    }
  }
}

export async function getTicketsByTenantAction(
  tenantId: string
): Promise<ActionState<SelectTicket[]>> {
  try {
    console.log("Fetching tickets for tenant:", tenantId)
    const tickets = await db
      .select()
      .from(ticketsTable)
      .where(eq(ticketsTable.tenantId, tenantId))
      .orderBy(ticketsTable.createdAt)
    console.log("Successfully fetched tickets:", tickets.length)
    return {
      isSuccess: true,
      message: "Tickets retrieved successfully",
      data: tickets
    }
  } catch (error) {
    console.error("Error getting tickets:", {
      error,
      errorMessage: error instanceof Error ? error.message : "Unknown error",
      errorStack: error instanceof Error ? error.stack : undefined,
      tenantId
    })
    return { 
      isSuccess: false, 
      message: error instanceof Error 
        ? `Database error: ${error.message}`
        : "Failed to get tickets" 
    }
  }
}

export async function getTicketByIdAction(
  id: string,
  tenantId?: string
): Promise<ActionState<SelectTicket | undefined>> {
  try {
    console.log("Fetching ticket:", { id, tenantId })
    const conditions = tenantId
      ? and(eq(ticketsTable.id, id), eq(ticketsTable.tenantId, tenantId))
      : eq(ticketsTable.id, id)

    const [ticket] = await db
      .select()
      .from(ticketsTable)
      .where(conditions)

    console.log("Successfully fetched ticket:", ticket)
    return {
      isSuccess: true,
      message: "Ticket retrieved successfully",
      data: ticket
    }
  } catch (error) {
    console.error("Error getting ticket:", {
      error,
      errorMessage: error instanceof Error ? error.message : "Unknown error",
      errorStack: error instanceof Error ? error.stack : undefined,
      id,
      tenantId
    })
    return { 
      isSuccess: false, 
      message: error instanceof Error 
        ? `Database error: ${error.message}`
        : "Failed to get ticket" 
    }
  }
}

export async function updateTicketAction(
  id: string,
  data: Partial<InsertTicket>
): Promise<ActionState<SelectTicket>> {
  try {
    console.log("Updating ticket:", { id, data })
    const [updatedTicket] = await db
      .update(ticketsTable)
      .set(data)
      .where(eq(ticketsTable.id, id))
      .returning()

    console.log("Successfully updated ticket:", updatedTicket)
    return {
      isSuccess: true,
      message: "Ticket updated successfully",
      data: updatedTicket
    }
  } catch (error) {
    console.error("Error updating ticket:", {
      error,
      errorMessage: error instanceof Error ? error.message : "Unknown error",
      errorStack: error instanceof Error ? error.stack : undefined,
      id,
      data
    })
    return { 
      isSuccess: false, 
      message: error instanceof Error 
        ? `Database error: ${error.message}`
        : "Failed to update ticket" 
    }
  }
}

export async function deleteTicketAction(id: string): Promise<ActionState<void>> {
  try {
    console.log("Deleting ticket:", id)
    await db.delete(ticketsTable).where(eq(ticketsTable.id, id))
    console.log("Successfully deleted ticket:", id)
    return {
      isSuccess: true,
      message: "Ticket deleted successfully",
      data: undefined
    }
  } catch (error) {
    console.error("Error deleting ticket:", {
      error,
      errorMessage: error instanceof Error ? error.message : "Unknown error",
      errorStack: error instanceof Error ? error.stack : undefined,
      id
    })
    return { 
      isSuccess: false, 
      message: error instanceof Error 
        ? `Database error: ${error.message}`
        : "Failed to delete ticket" 
    }
  }
}

export async function getAllTicketsAction(
  filters?: {
    status?: "open" | "in_progress" | "completed" | "closed" | "completed_by_chat" | "all"
    priority?: "low" | "medium" | "high" | "critical" | "all"
  }
): Promise<ActionState<SelectTicket[]>> {
  try {
    console.log("Fetching all tickets with filters:", filters)
    
    const conditions = []
    if (filters?.status && filters.status !== "all") {
      conditions.push(eq(ticketsTable.status, filters.status))
    }
    if (filters?.priority && filters.priority !== "all") {
      conditions.push(eq(ticketsTable.priority, filters.priority))
    }

    const tickets = await db
      .select()
      .from(ticketsTable)
      .where(and(...conditions))
      .orderBy(desc(ticketsTable.createdAt))

    console.log("Successfully fetched tickets:", tickets.length)
    return {
      isSuccess: true,
      message: "Tickets retrieved successfully",
      data: tickets
    }
  } catch (error) {
    console.error("Error getting tickets:", {
      error,
      errorMessage: error instanceof Error ? error.message : "Unknown error",
      errorStack: error instanceof Error ? error.stack : undefined,
      filters
    })
    return { 
      isSuccess: false, 
      message: error instanceof Error 
        ? `Database error: ${error.message}`
        : "Failed to get tickets" 
    }
  }
} 