"use server"

import { Message } from "@/types/chat-types"
import { TicketSuggestion, ConversationInsight, AIConfig, ContextItem } from "@/types/ai-types"
import { ActionState } from "@/types"
import { openai, withTracing } from "@/lib/langsmith-config"
import { analyzeConversation } from "@/lib/ai/chat-analysis"
import { db } from "@/db/db"
import { chatMessagesTable, chatSessionsTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { getContextAction } from "@/actions/context-actions"

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

interface SendMessageResponse {
  message: Message
  ticketSuggestion?: TicketSuggestion
  insights?: ConversationInsight[]
}

export const sendMessageAction = withTracing(
  async function sendMessageAction(
    content: string,
    messages: Message[] = [],
    attachments?: File[]
  ): Promise<ActionState<SendMessageResponse>> {
    try {
      // Get session ID from messages or create a new one
      const sessionId = messages[0]?.sessionId || crypto.randomUUID()

      // Get context
      const { data: context } = await getContextAction()
      const contextSummary = context?.summary || ""

      // Analyze conversation for insights and ticket suggestions
      const analysis = await analyzeConversation([...messages, { 
        id: crypto.randomUUID(),
        sessionId,
        content,
        role: "user",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }])

      // Format conversation history for OpenAI
      const conversationHistory = messages.map(msg => ({
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

      // Get completion from OpenAI with full context
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-2024-08-06",
        messages: fullHistory,
        temperature: 0.7,
        max_tokens: 500
      })

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        sessionId,
        content: completion.choices[0].message.content || "",
        role: "assistant",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      return {
        isSuccess: true,
        message: "Message sent successfully",
        data: {
          message: aiMessage,
          ticketSuggestion: analysis.ticketSuggestion || undefined,
          insights: analysis.insights
        }
      }
    } catch (error) {
      console.error("Error in sendMessageAction:", error)
      return {
        isSuccess: false,
        message: error instanceof Error ? error.message : "Failed to send message"
      }
    }
  },
  { runType: "chain", name: "send_message" }
) 