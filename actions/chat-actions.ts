"use server"

import { Message } from "@/types/chat-types"
import { TicketSuggestion, ConversationInsight, AIConfig } from "@/types/ai-types"
import { ActionState } from "@/types"
import OpenAI from "openai"
import { analyzeConversation } from "@/lib/ai/chat-analysis"

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
    // Format conversation history for OpenAI
    const conversationHistory = messages.map(msg => ({
      role: msg.role as "user" | "assistant",
      content: msg.content
    }))

    // Add system message at the start of each conversation
    const fullHistory = [
      { 
        role: "system" as const, 
        content: DEFAULT_SYSTEM_PROMPT 
      },
      ...conversationHistory,
      { 
        role: "user" as const, 
        content 
      }
    ]

    // Log the conversation history being sent
    console.log("Sending conversation to OpenAI:", {
      messageCount: fullHistory.length,
      systemPrompt: fullHistory[0].content,
      history: fullHistory.slice(1), // Exclude system prompt from log
      newMessage: content
    })

    // Verify history is not empty and properly structured
    if (fullHistory.length < 2) { // At least system + user message
      console.warn("Warning: Minimal conversation history")
    }

    // Get completion from OpenAI with full context
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-2024-08-06",
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
      sessionId: messages[0]?.sessionId || "current-session",
      content: aiMessage.content || "No response generated",
      role: "assistant",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Add the new messages to the history for analysis
    const updatedMessages = [
      ...messages,
      { role: "user", content } as Message,
      message
    ]

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
    console.error("Error sending message:", error)
    return { isSuccess: false, message: "Failed to send message" }
  }
} 