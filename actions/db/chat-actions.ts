"use server"

import { db } from "@/db/db"
import { 
  chatSessionsTable,
  chatMessagesTable,
  chatAttachmentsTable,
  chatTicketsTable,
  chatContextTable,
  InsertChatSession,
  InsertChatMessage,
  InsertChatAttachment,
  InsertChatTicket,
  SelectChatSession,
  SelectChatMessage,
  SelectChatAttachment,
  SelectChatTicket,
  SelectChatContext
} from "@/db/schema"
import { ActionState } from "@/types"
import { eq, desc, sql } from "drizzle-orm"
import { ContextWindow } from "@/types/ai-types"

interface CreateChatSessionParams {
  userId: string
  title: string
}

interface CreateChatMessageParams {
  sessionId: string
  content: string
  role: "user" | "assistant"
}

interface CreateChatAttachmentParams {
  messageId: string
  name: string
  type: string
  url: string
  size: number
  metadata: string | null
}

// Chat Sessions
export async function createChatSessionAction(
  params: CreateChatSessionParams
): Promise<ActionState<SelectChatSession>> {
  try {
    console.log("Creating chat session:", params)
    const [session] = await db
      .insert(chatSessionsTable)
      .values({
        userId: params.userId,
        title: params.title
      })
      .returning()

    console.log("Created chat session:", session)
    return {
      isSuccess: true,
      message: "Chat session created successfully",
      data: session
    }
  } catch (error) {
    console.error("Error creating chat session:", error)
    return {
      isSuccess: false,
      message: error instanceof Error ? error.message : "Failed to create chat session"
    }
  }
}

export async function getChatSessionsAction(
  userId: string
): Promise<ActionState<SelectChatSession[]>> {
  try {
    console.log("Getting chat sessions for user:", userId)
    const sessions = await db
      .select()
      .from(chatSessionsTable)
      .where(eq(chatSessionsTable.userId, userId))
      .orderBy(chatSessionsTable.createdAt)

    console.log("Found chat sessions:", sessions)
    return {
      isSuccess: true,
      message: "Chat sessions retrieved successfully",
      data: sessions
    }
  } catch (error) {
    console.error("Error getting chat sessions:", error)
    return {
      isSuccess: false,
      message: error instanceof Error ? error.message : "Failed to get chat sessions"
    }
  }
}

// Chat Messages
export async function createChatMessageAction(
  params: CreateChatMessageParams
): Promise<ActionState<SelectChatMessage>> {
  try {
    console.log("Creating chat message:", params)
    const [message] = await db
      .insert(chatMessagesTable)
      .values({
        sessionId: params.sessionId,
        content: params.content,
        role: params.role,
        metadata: {} // Empty JSONB object
      })
      .returning()

    console.log("Created chat message:", message)
    return {
      isSuccess: true,
      message: "Message created successfully",
      data: message
    }
  } catch (error) {
    console.error("Error creating chat message:", error)
    return {
      isSuccess: false,
      message: error instanceof Error ? error.message : "Failed to create message"
    }
  }
}

export async function getChatMessagesAction(
  sessionId: string
): Promise<ActionState<SelectChatMessage[]>> {
  try {
    console.log("Getting chat messages for session:", sessionId)
    const messages = await db
      .select()
      .from(chatMessagesTable)
      .where(eq(chatMessagesTable.sessionId, sessionId))
      .orderBy(chatMessagesTable.createdAt)

    console.log("Found chat messages:", messages)
    return {
      isSuccess: true,
      message: "Chat messages retrieved successfully",
      data: messages
    }
  } catch (error) {
    console.error("Error getting chat messages:", error)
    return {
      isSuccess: false,
      message: error instanceof Error ? error.message : "Failed to get chat messages"
    }
  }
}

// Chat Attachments
export async function createChatAttachmentAction(
  params: CreateChatAttachmentParams
): Promise<ActionState<SelectChatAttachment>> {
  try {
    console.log("Creating chat attachment:", params)
    const [attachment] = await db
      .insert(chatAttachmentsTable)
      .values({
        messageId: params.messageId,
        name: params.name,
        type: params.type,
        url: params.url,
        size: params.size,
        metadata: params.metadata
      })
      .returning()

    console.log("Created chat attachment:", attachment)
    return {
      isSuccess: true,
      message: "Attachment created successfully",
      data: attachment
    }
  } catch (error) {
    console.error("Error creating chat attachment:", error)
    return {
      isSuccess: false,
      message: error instanceof Error ? error.message : "Failed to create attachment"
    }
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

// Chat Context
export async function updateChatContextAction(
  sessionId: string,
  context: Partial<ContextWindow>
): Promise<ActionState<SelectChatContext>> {
  try {
    console.log("Updating chat context:", { 
      sessionId, 
      context: {
        shortTerm: context.shortTerm ? JSON.stringify(context.shortTerm) : undefined,
        longTerm: context.longTerm ? JSON.stringify(context.longTerm) : undefined,
        metadata: context.metadata,
        summary: context.summary
      }
    })
    
    // First try to get existing context
    const [existingContext] = await db
      .select()
      .from(chatContextTable)
      .where(eq(chatContextTable.sessionId, sessionId))
    
    if (existingContext) {
      // Update existing context
      const [updatedContext] = await db
        .update(chatContextTable)
        .set({
          shortTerm: context.shortTerm ? sql`${JSON.stringify(context.shortTerm)}::jsonb` : undefined,
          longTerm: context.longTerm ? sql`${JSON.stringify(context.longTerm)}::jsonb` : undefined,
          metadata: context.metadata ? sql`${JSON.stringify(context.metadata)}::jsonb` : undefined,
          summary: context.summary
        })
        .where(eq(chatContextTable.sessionId, sessionId))
        .returning()

      console.log("Updated existing chat context:", updatedContext)
      return {
        isSuccess: true,
        message: "Chat context updated successfully",
        data: updatedContext
      }
    } else {
      // Create new context with proper typing
      const [newContext] = await db
        .insert(chatContextTable)
        .values({
          sessionId,
          shortTerm: sql`${JSON.stringify(context.shortTerm || [])}::jsonb`,
          longTerm: sql`${JSON.stringify(context.longTerm || [])}::jsonb`,
          metadata: sql`${JSON.stringify(context.metadata || {})}::jsonb`,
          summary: context.summary
        })
        .returning()

      console.log("Created new chat context:", newContext)
      return {
        isSuccess: true,
        message: "Chat context created successfully",
        data: newContext
      }
    }
  } catch (error) {
    console.error("Error updating chat context:", error)
    return {
      isSuccess: false,
      message: error instanceof Error ? error.message : "Failed to update chat context"
    }
  }
} 