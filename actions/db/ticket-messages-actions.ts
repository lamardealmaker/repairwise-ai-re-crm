"use server"

import { db } from "@/db/db"
import {
  InsertTicketMessage,
  SelectTicketMessage,
  ticketMessagesTable
} from "@/db/schema"
import { ActionState } from "@/types"
import { eq } from "drizzle-orm"

export async function createTicketMessageAction(
  message: InsertTicketMessage
): Promise<ActionState<SelectTicketMessage>> {
  try {
    const [newMessage] = await db
      .insert(ticketMessagesTable)
      .values(message)
      .returning()
    return {
      isSuccess: true,
      message: "Message created successfully",
      data: newMessage
    }
  } catch (error) {
    console.error("Error creating message:", error)
    return { isSuccess: false, message: "Failed to create message" }
  }
}

export async function getTicketMessagesAction(
  ticketId: string
): Promise<ActionState<SelectTicketMessage[]>> {
  try {
    const messages = await db
      .select()
      .from(ticketMessagesTable)
      .where(eq(ticketMessagesTable.ticketId, ticketId))
      .orderBy(ticketMessagesTable.createdAt)

    return {
      isSuccess: true,
      message: "Messages retrieved successfully",
      data: messages
    }
  } catch (error) {
    console.error("Error getting messages:", error)
    return { isSuccess: false, message: "Failed to get messages" }
  }
}

export async function updateTicketMessageAction(
  id: string,
  data: Partial<InsertTicketMessage>
): Promise<ActionState<SelectTicketMessage>> {
  try {
    const [updatedMessage] = await db
      .update(ticketMessagesTable)
      .set(data)
      .where(eq(ticketMessagesTable.id, id))
      .returning()

    return {
      isSuccess: true,
      message: "Message updated successfully",
      data: updatedMessage
    }
  } catch (error) {
    console.error("Error updating message:", error)
    return { isSuccess: false, message: "Failed to update message" }
  }
}

export async function deleteTicketMessageAction(
  id: string
): Promise<ActionState<void>> {
  try {
    await db.delete(ticketMessagesTable).where(eq(ticketMessagesTable.id, id))
    return {
      isSuccess: true,
      message: "Message deleted successfully",
      data: undefined
    }
  } catch (error) {
    console.error("Error deleting message:", error)
    return { isSuccess: false, message: "Failed to delete message" }
  }
} 