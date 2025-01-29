"use server"

import { Message } from "@/types/chat-types"
import { TicketSuggestion, ConversationInsight } from "@/types/ai-types"
import {
  updateContextAction,
  getRelevantContextAction
} from "./context-manager"

export async function analyzeConversation(messages: Message[]): Promise<{
  ticketSuggestion: TicketSuggestion | null
  insights: ConversationInsight[]
}> {
  // Update context with latest message
  const latestMessage = messages[messages.length - 1]
  const context = await updateContextAction(latestMessage)

  // For now, using mock analysis
  // This would be replaced with actual AI analysis
  const ticketSuggestion: TicketSuggestion | null =
    messages.length >= 3
      ? {
          title: "Automated Ticket Suggestion",
          priority: "medium",
          category: "Technical Support",
          summary:
            context.summary || "AI-generated summary of the conversation...",
          confidence: 0.85,
          relevantMessageIds: messages.slice(-3).map(m => m.id)
        }
      : null

  const insights: ConversationInsight[] = [
    {
      type: "issue",
      content: "User seems to be experiencing technical difficulties",
      confidence: 0.9
    },
    {
      type: "request",
      content: "Feature enhancement request detected",
      confidence: 0.75
    }
  ]

  return { ticketSuggestion, insights }
}

export async function generateTicketDraft(
  messages: Message[],
  suggestion: TicketSuggestion
): Promise<ReadableStream> {
  const context = await updateContextAction(messages[messages.length - 1])
  const relevantContext = await getRelevantContextAction()

  // This would be replaced with actual streaming AI response
  const encoder = new TextEncoder()
  const chunks = [
    "Creating ticket draft...\n",
    `Title: ${suggestion.title}\n`,
    `Priority: ${suggestion.priority}\n`,
    `Category: ${suggestion.category}\n`,
    `Context Summary: ${context.summary}\n`,
    "Description:\n",
    suggestion.summary
  ]

  return new ReadableStream({
    async start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(chunk))
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      controller.close()
    }
  })
}

export async function suggestNextSteps(messages: Message[]): Promise<string[]> {
  const context = await updateContextAction(messages[messages.length - 1])

  // This would be replaced with actual AI suggestions
  return [
    "Schedule a maintenance visit",
    "Review property documentation",
    "Follow up in 24 hours"
  ]
}
