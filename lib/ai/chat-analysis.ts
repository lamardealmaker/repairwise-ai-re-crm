"use server"

import { Message } from "@/types/chat-types"
import {
  TicketSuggestion,
  ConversationInsight,
  ContextWindow
} from "@/types/ai-types"
import { updateContextAction, getContextAction } from "./context-manager"
import { openai, withTracing } from "@/lib/langsmith-config"

const ANALYSIS_PROMPT = `Analyze the following conversation between a tenant and AI assistant.
Extract key information and generate insights.

For ticket suggestions:
- Consider the ENTIRE conversation history, not just the latest message
- Look for patterns and recurring issues across multiple messages
- Identify maintenance issues or important requests that need attention
- Generate a title, priority, and category based on the full context
- Assign a confidence score (0-1) based on the overall clarity and urgency
- Include relevant message IDs from throughout the conversation

IMPORTANT: Only use these exact categories:
- "maintenance" - for repairs, plumbing, HVAC, appliances, etc.
- "billing" - for rent, fees, payments
- "noise_complaint" - for noise disturbances
- "other" - for anything else

For insights:
- Analyze the complete conversation flow
- Identify recurring themes or escalating issues
- Track issue progression and any attempted solutions
- Note any changes in urgency or tenant satisfaction
- Include relevant context from multiple messages
- Assign confidence scores based on pattern strength

Consider these aspects:
1. Issue History: Has this been mentioned before?
2. Urgency Progression: Has the issue become more urgent?
3. Solution Attempts: What has been tried?
4. Impact: How is this affecting the tenant?
5. Related Issues: Are there connected problems?

Respond in the following JSON format:
{
  "ticketSuggestion": {
    "title": string,
    "priority": "low" | "medium" | "high",
    "category": "maintenance" | "billing" | "noise_complaint" | "other",
    "summary": string,
    "confidence": number,
    "relevantMessageIds": string[]
  } | null,
  "insights": [
    {
      "type": "issue" | "request" | "feedback",
      "content": string,
      "confidence": number,
      "context": string
    }
  ]
}`

// Add validation function
function validateAnalysis(analysis: any): boolean {
  const validCategories = ["maintenance", "billing", "noise_complaint", "other"]
  const validPriorities = ["low", "medium", "high"]

  if (!analysis) return false

  // If there's no ticket suggestion, that's valid
  if (!analysis.ticketSuggestion) return true

  // Validate ticket suggestion
  const suggestion = analysis.ticketSuggestion
  if (
    !suggestion.title ||
    !suggestion.summary ||
    !validCategories.includes(suggestion.category) ||
    !validPriorities.includes(suggestion.priority) ||
    typeof suggestion.confidence !== "number" ||
    !Array.isArray(suggestion.relevantMessageIds)
  ) {
    console.error("Invalid ticket suggestion format:", suggestion)
    return false
  }

  // Validate insights
  if (!Array.isArray(analysis.insights)) {
    console.error("Insights must be an array")
    return false
  }

  return true
}

// ✅ Monitored: Conversation analysis function
export const analyzeConversation = withTracing(
  async function analyzeConversation(messages: Message[]): Promise<{
    ticketSuggestion: TicketSuggestion | null
    insights: ConversationInsight[]
    context: ContextWindow
  }> {
    try {
      // Get the full context window
      const context = await getContextAction()

      // Combine short-term and long-term context
      const contextSummary = `
        Short-term Context: ${context.shortTerm.map(m => `${m.role.toUpperCase()}: ${m.content}`).join("\n")}
        
        Long-term Context: ${context.longTerm.map(item => `${item.key}: ${item.value}`).join("\n")}
        
        Summary: ${context.summary}
      `

      // Format the complete conversation with context
      const conversationText = `
        Context Information:
        ${contextSummary}
        
        Current Conversation:
        ${messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join("\n")}
      `

      // ✅ Monitored: OpenAI completion using traced client
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-2024-08-06",
        messages: [
          { role: "system", content: ANALYSIS_PROMPT },
          { role: "user", content: conversationText }
        ],
        temperature: 0.2,
        max_tokens: 1000,
        response_format: { type: "json_object" }
      })

      const analysis = JSON.parse(completion.choices[0].message.content || "{}")

      // Validate the analysis
      if (!validateAnalysis(analysis)) {
        console.error("Invalid analysis format:", analysis)
        return {
          ticketSuggestion: null,
          insights: [],
          context
        }
      }

      // Update context with new insights
      const updatedContext: ContextWindow = {
        ...context,
        summary:
          context.summary +
          "\n" +
          analysis.insights
            .map((i: ConversationInsight) => i.content)
            .join("\n")
      }

      // Update context in database
      await updateContextAction(messages[messages.length - 1])

      return {
        ticketSuggestion: analysis.ticketSuggestion,
        insights: analysis.insights || [],
        context: updatedContext
      }
    } catch (error) {
      console.error("Error in conversation analysis:", error)
      throw error
    }
  },
  { runType: "chain", name: "analyze_conversation" }
)

// ✅ Monitored: Ticket draft generation function
export const generateTicketDraft = withTracing(
  async function generateTicketDraft(
    messages: Message[],
    suggestion: TicketSuggestion
  ): Promise<ReadableStream> {
    const context = await getContextAction()
    const encoder = new TextEncoder()

    try {
      const prompt = `Based on the following conversation and ticket suggestion, generate a detailed ticket description.
      Include all relevant details from the conversation and context.

      Ticket Suggestion:
      Title: ${suggestion.title}
      Priority: ${suggestion.priority}
      Category: ${suggestion.category}
      Summary: ${suggestion.summary}

      Context Summary: ${context.summary}

      Conversation:
      ${messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join("\n")}

      Generate a professional and detailed ticket description that would help maintenance staff understand and address the issue.`

      // ✅ Monitored: OpenAI streaming completion using traced client
      const stream = await openai.chat.completions.create({
        model: "gpt-4o-2024-08-06",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that generates detailed maintenance ticket descriptions."
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000,
        stream: true
      })

      return new ReadableStream({
        async start(controller) {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content || ""
            controller.enqueue(encoder.encode(text))
          }
          controller.close()
        }
      })
    } catch (error) {
      console.error("Error generating ticket draft:", error)
      return new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode("Failed to generate ticket draft."))
          controller.close()
        }
      })
    }
  },
  { runType: "chain", name: "generate_ticket_draft" }
)

// ✅ Monitored: Next steps suggestion function
export const suggestNextSteps = withTracing(
  async function suggestNextSteps(messages: Message[]): Promise<string[]> {
    try {
      const context = await getContextAction()
      const prompt = `Based on the conversation and context, suggest 2-3 next steps or actions that would be helpful.
      
      Context Summary: ${context.summary}
      
      Conversation:
      ${messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join("\n")}`

      // ✅ Monitored: OpenAI completion using traced client
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-2024-08-06",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that suggests next steps for property management issues."
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 500
      })

      const suggestions =
        completion.choices[0].message.content
          ?.split("\n")
          .filter(line => line.trim())
          .map(line => line.replace(/^\d+\.\s*/, "").trim()) || []

      return suggestions.length > 0 ? suggestions : ["Follow up in 24 hours"]
    } catch (error) {
      console.error("Error suggesting next steps:", error)
      return ["Follow up in 24 hours"]
    }
  },
  { runType: "chain", name: "suggest_next_steps" }
)
