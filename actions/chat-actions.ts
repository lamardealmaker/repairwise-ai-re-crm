"use server"

import { Message } from "@/types/chat-types"
import { TicketSuggestion, ConversationInsight, AIConfig, ContextItem } from "@/types/ai-types"
import { ActionState } from "@/types"
import OpenAI from "openai"
import { analyzeConversation } from "@/lib/ai/chat-analysis"
import { db } from "@/db/db"
import { chatMessagesTable, chatSessionsTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { getContextAction } from "@/actions/context-actions"

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
Be professional, helpful, and concise in your responses. Respond to the user in natural language. Don't respond with confidence levels or percentages or different things that wouldn't make that much sense to the user. Some of this information is just for your internal use only, and you can translate it into simple, digestible, short information that the user can understand. 

Important Guidelines:
1. Consider the ENTIRE conversation history when responding
2. Maintain context from previous messages
3. Reference previous issues or requests when relevant
4. If a tenant mentions a previous issue, acknowledge it
5. Track the progression of issues over time
6. If an issue has been mentioned before, note its history
7. Provide consistent advice across the conversation

If you detect any maintenance issues or important requests:
1. Note them for potential ticket creation
2. Track if they've been mentioned before
3. Monitor if they're getting worse
4. Note any attempted solutions
5. Consider their impact on the tenant

Categories for issues:
- "maintenance" - repairs, plumbing, HVAC, appliances, etc.
- "billing" - rent, fees, payments
- "noise_complaint" - noise disturbances
- "other" - anything else not covered above`

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
        role: msg.role as "user" | "assistant",
        createdAt: msg.createdAt.toISOString(),
        updatedAt: msg.updatedAt.toISOString()
      }))
    }

    // Combine existing messages with new messages, ensuring no duplicates
    const allMessages = [...existingMessages, ...messages].filter((msg, index, self) =>
      index === self.findIndex(m => m.id === msg.id)
    )

    // Add the new user message to the history for analysis
    const userMessage = {
      id: crypto.randomUUID(),
      sessionId: sessionId || "current-session",
      content,
      role: "user" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const messagesForAnalysis = [...allMessages, userMessage]

    // First, analyze the conversation to get insights and ticket suggestions
    console.log("Analyzing conversation for insights and suggestions...")
    const analysis = await analyzeConversation(messagesForAnalysis)

    // Get the conversation context
    const contextResult = await getContextAction()
    const context = contextResult.isSuccess ? contextResult.data : null

    // Create a comprehensive context summary including insights and ticket suggestions
    const contextSummary = `
Current Context:
${context?.summary || "No context available"}

Long-term Information:
${context?.longTerm.map((item: ContextItem) => `- ${item.key}: ${item.value}`).join("\n") || "No long-term information"}

Current Conversation Analysis:
${analysis.insights.map(insight => 
  `- ${insight.type.toUpperCase()}: ${insight.content} (Confidence: ${Math.round(insight.confidence * 100)}%)`
).join("\n")}

${analysis.ticketSuggestion ? `
Active Ticket Suggestion:
- Title: ${analysis.ticketSuggestion.title}
- Category: ${analysis.ticketSuggestion.category}
- Priority: ${analysis.ticketSuggestion.priority}
- Summary: ${analysis.ticketSuggestion.summary}
- Confidence: ${Math.round(analysis.ticketSuggestion.confidence * 100)}%
` : "No active ticket suggestions"}
`

    // Format conversation history for OpenAI
    const conversationHistory = allMessages.map(msg => ({
      role: msg.role,
      content: msg.content
    }))

    // Always add system message at the start with the enhanced context
    const fullHistory = [
      { 
        role: "system" as const, 
        content: `${DEFAULT_SYSTEM_PROMPT}\n\n${contextSummary}` 
      },
      ...conversationHistory,
      { role: "user" as const, content }
    ]

    console.log("Prepared conversation history:", {
      total: fullHistory.length,
      hasSystemPrompt: fullHistory[0].role === "system",
      hasContext: !!contextSummary,
      hasInsights: analysis.insights.length > 0,
      hasTicketSuggestion: !!analysis.ticketSuggestion,
      messageSequence: fullHistory.map(m => ({ role: m.role, preview: m.content.slice(0, 30) }))
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
      sessionId: sessionId || "current-session",
      content: aiMessage.content || "No response generated",
      role: "assistant",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      id: "temp"
    }

    // Save message to database if we have a session
    if (sessionId) {
      console.log("Saving AI message to database:", {
        sessionId,
        contentPreview: message.content.slice(0, 50)
      })

      const result = await db.insert(chatMessagesTable).values({
        sessionId: message.sessionId,
        content: message.content,
        role: message.role,
        metadata: {}
      }).returning()

      // Update message with generated ID and timestamps
      message.id = result[0].id
      message.createdAt = result[0].createdAt.toISOString()
      message.updatedAt = result[0].updatedAt.toISOString()
    }

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