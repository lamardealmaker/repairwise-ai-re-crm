"use server"

import { Message } from "@/types/chat-types"
import { TicketSuggestion, ConversationInsight, AIConfig } from "@/types/ai-types"
import { ActionState } from "@/types"
import OpenAI from "openai"
import { analyzeConversation } from "@/lib/ai/chat-analysis"
import { db } from "@/db/db"
import { chatMessagesTable, chatSessionsTable } from "@/db/schema"
import { eq } from "drizzle-orm"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

interface SendMessageResponse {
  message: Message
  ticketSuggestion?: TicketSuggestion
  insights?: ConversationInsight[]
}

const DEFAULT_SYSTEM_PROMPT = `You are an AI assistant for a property management system. 
You help tenants with their inquiries, maintenance requests, and other property-related matters.
Be professional, helpful, and concise in your responses.
If you detect any maintenance issues or important requests, note them for potential ticket creation.`

export async function sendMessageAction(
  content: string,
  messages: Message[] = [],
  attachments?: File[]
): Promise<ActionState<SendMessageResponse>> {
  try {
    // Log initial state
    console.log("Starting sendMessageAction:", {
      content: content.slice(0, 50),
      existingMessages: messages.length,
      sessionId: messages[0]?.sessionId || "none"
    })

    // Get the session ID from the first message or create a new session
    const sessionId = messages[0]?.sessionId

    // Load existing messages from the database for this session
    let existingMessages: Message[] = []
    if (sessionId) {
      console.log("Loading messages for session:", sessionId)
      const dbMessages = await db.query.chatMessages.findMany({
        where: eq(chatMessagesTable.sessionId, sessionId),
        orderBy: (messages, { asc }) => [asc(messages.createdAt)]
      })

      console.log("Loaded messages from DB:", {
        count: dbMessages.length,
        firstMessage: dbMessages[0]?.content.slice(0, 50),
        lastMessage: dbMessages[dbMessages.length - 1]?.content.slice(0, 50)
      })

      existingMessages = dbMessages.map(msg => ({
        id: msg.id,
        sessionId: msg.sessionId,
        content: msg.content,
        role: msg.role as "user" | "assistant" | "system",
        createdAt: msg.createdAt.toISOString(),
        updatedAt: msg.updatedAt.toISOString()
      }))
    }

    // Combine existing messages with new messages, ensuring no duplicates
    const allMessages = [...existingMessages, ...messages].filter((msg, index, self) =>
      index === self.findIndex(m => m.id === msg.id)
    )

    console.log("Combined messages:", {
      total: allMessages.length,
      fromDb: existingMessages.length,
      fromMemory: messages.length,
      afterDeduplication: allMessages.length
    })

    // Format conversation history for OpenAI
    const conversationHistory = allMessages.map(msg => ({
      role: msg.role as "user" | "assistant" | "system",
      content: msg.content
    }))

    // Add system message at the start if not present
    const fullHistory = conversationHistory.length > 0 && conversationHistory[0].role === "system"
      ? [...conversationHistory, { role: "user" as const, content }]
      : [
          { role: "system" as const, content: DEFAULT_SYSTEM_PROMPT },
          ...conversationHistory,
          { role: "user" as const, content }
        ]

    console.log("Prepared conversation history:", {
      total: fullHistory.length,
      hasSystemPrompt: fullHistory[0].role === "system",
      messageSequence: fullHistory.map(m => ({ role: m.role, preview: m.content.slice(0, 30) }))
    })

    // Log the conversation history being sent
    console.log("Sending conversation to OpenAI:", {
      messageCount: fullHistory.length,
      systemPrompt: fullHistory[0].content,
      lastMessages: fullHistory.slice(-3).map(m => ({ role: m.role, preview: m.content.slice(0, 50) })),
      totalHistory: fullHistory.length
    })

    // Get completion from OpenAI with full context
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: fullHistory,
      temperature: 0.7,
      max_tokens: 500
    })

    console.log("OpenAI response:", {
      role: completion.choices[0].message.role,
      content: completion.choices[0].message.content,
      fullHistoryLength: fullHistory.length
    })

    const aiMessage = completion.choices[0].message

    // Create message object with proper metadata
    const message: Message = {
      id: crypto.randomUUID(),
      sessionId: sessionId || "current-session",
      content: aiMessage.content || "No response generated",
      role: "assistant",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Save message to database if we have a session
    if (sessionId) {
      console.log("Saving AI message to database:", {
        sessionId,
        messageId: message.id,
        contentPreview: message.content.slice(0, 50)
      })

      await db.insert(chatMessagesTable).values({
        id: message.id,
        sessionId: message.sessionId,
        content: message.content,
        role: message.role,
        createdAt: new Date(message.createdAt),
        updatedAt: new Date(message.updatedAt)
      })
    }

    // Add the new messages to the history for analysis
    const updatedMessages = [...allMessages, message]

    console.log("Final message state:", {
      totalMessages: updatedMessages.length,
      sequence: updatedMessages.map(m => ({
        role: m.role,
        preview: m.content.slice(0, 30),
        id: m.id
      }))
    })

    // Analyze conversation for insights and ticket suggestions
    const analysis = await analyzeConversation(updatedMessages)

    return {
      isSuccess: true,
      message: "Message sent successfully",
      data: {
        message,
        ticketSuggestion: analysis.ticketSuggestion || undefined,
        insights: analysis.insights
      }
    }
  } catch (error) {
    console.error("Error in sendMessageAction:", error)
    return { isSuccess: false, message: "Failed to send message" }
  }
} 