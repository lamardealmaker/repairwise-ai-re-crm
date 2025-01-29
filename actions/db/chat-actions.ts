"use server"

import { db } from "@/db/db"
import { 
  chatSessionsTable,
  chatMessagesTable,
  chatAttachmentsTable,
  chatTicketsTable,
  InsertChatSession,
  InsertChatMessage,
  InsertChatAttachment,
  InsertChatTicket,
  SelectChatSession,
  SelectChatMessage,
  SelectChatAttachment,
  SelectChatTicket
} from "@/db/schema"
import { ActionState } from "@/types"
import { eq, desc } from "drizzle-orm"

// Chat Sessions
export async function createChatSessionAction(
  session: InsertChatSession
): Promise<ActionState<SelectChatSession>> {
  try {
    const [newSession] = await db
      .insert(chatSessionsTable)
      .values(session)
      .returning()

    return {
      isSuccess: true,
      message: "Chat session created successfully",
      data: newSession
    }
  } catch (error) {
    console.error("Error creating chat session:", error)
    return { isSuccess: false, message: "Failed to create chat session" }
  }
}

export async function getChatSessionsAction(
  userId: string
): Promise<ActionState<SelectChatSession[]>> {
  try {
    const sessions = await db.query.chatSessions.findMany({
      where: eq(chatSessionsTable.userId, userId),
      orderBy: desc(chatSessionsTable.updatedAt),
      with: {
        messages: true,
        tickets: true
      }
    })

    return {
      isSuccess: true,
      message: "Chat sessions retrieved successfully",
      data: sessions
    }
  } catch (error) {
    console.error("Error getting chat sessions:", error)
    return { isSuccess: false, message: "Failed to get chat sessions" }
  }
}

// Chat Messages
export async function createChatMessageAction(
  message: InsertChatMessage
): Promise<ActionState<SelectChatMessage>> {
  try {
    const [newMessage] = await db
      .insert(chatMessagesTable)
      .values(message)
      .returning()

    return {
      isSuccess: true,
      message: "Message sent successfully",
      data: newMessage
    }
  } catch (error) {
    console.error("Error creating chat message:", error)
    return { isSuccess: false, message: "Failed to send message" }
  }
}

export async function getChatMessagesAction(
  sessionId: string
): Promise<ActionState<SelectChatMessage[]>> {
  try {
    const messages = await db.query.chatMessages.findMany({
      where: eq(chatMessagesTable.sessionId, sessionId),
      orderBy: desc(chatMessagesTable.createdAt),
      with: {
        attachments: true
      }
    })

    return {
      isSuccess: true,
      message: "Messages retrieved successfully",
      data: messages
    }
  } catch (error) {
    console.error("Error getting chat messages:", error)
    return { isSuccess: false, message: "Failed to get messages" }
  }
}

// Chat Attachments
export async function createChatAttachmentAction(
  attachment: InsertChatAttachment
): Promise<ActionState<SelectChatAttachment>> {
  try {
    const [newAttachment] = await db
      .insert(chatAttachmentsTable)
      .values(attachment)
      .returning()

    return {
      isSuccess: true,
      message: "Attachment uploaded successfully",
      data: newAttachment
    }
  } catch (error) {
    console.error("Error creating chat attachment:", error)
    return { isSuccess: false, message: "Failed to upload attachment" }
  }
}

// Chat Tickets
export async function createChatTicketAction(
  ticket: InsertChatTicket
): Promise<ActionState<SelectChatTicket>> {
  try {
    const [newTicket] = await db
      .insert(chatTicketsTable)
      .values(ticket)
      .returning()

    return {
      isSuccess: true,
      message: "Ticket created successfully",
      data: newTicket
    }
  } catch (error) {
    console.error("Error creating chat ticket:", error)
    return { isSuccess: false, message: "Failed to create ticket" }
  }
}

export async function updateChatTicketAction(
  id: string,
  data: Partial<InsertChatTicket>
): Promise<ActionState<SelectChatTicket>> {
  try {
    const [updatedTicket] = await db
      .update(chatTicketsTable)
      .set(data)
      .where(eq(chatTicketsTable.id, id))
      .returning()

    return {
      isSuccess: true,
      message: "Ticket updated successfully",
      data: updatedTicket
    }
  } catch (error) {
    console.error("Error updating chat ticket:", error)
    return { isSuccess: false, message: "Failed to update ticket" }
  }
} 