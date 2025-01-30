"use server"

import { Message } from "@/types/chat-types"
import {
  TicketSuggestion,
  ConversationInsight,
  ContextWindow
} from "@/types/ai-types"
import { updateContextAction, getContextAction } from "./context-manager"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const ANALYSIS_PROMPT = `Analyze the following conversation between a tenant and AI assistant.
Extract key information and generate insights.

For ticket suggestions:
- Identify if there's a maintenance issue or important request that needs attention
- Generate a title, priority (low/medium/high), category, and summary
- Assign a confidence score (0-1) based on the clarity and urgency of the issue

For insights:
- Identify key patterns or important information
- Categorize as "issue", "request", or "feedback"
- Include relevant context from the conversation
- Assign a confidence score (0-1)

Respond in the following JSON format:
{
  "ticketSuggestion": {
    "title": string,
    "priority": "low" | "medium" | "high",
    "category": string,
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

export async function analyzeConversation(messages: Message[]): Promise<{
  ticketSuggestion: TicketSuggestion | null
  insights: ConversationInsight[]
  context: ContextWindow
}> {
  try {
    // Update context with latest message
    const latestMessage = messages[messages.length - 1]
    const context = await updateContextAction(latestMessage)

    // Format conversation for analysis
    const conversationText = messages
      .map(m => `${m.role.toUpperCase()}: ${m.content}`)
      .join("\n")

    // Get AI analysis
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

    return {
      ticketSuggestion: analysis.ticketSuggestion,
      insights: analysis.insights || [],
      context
    }
  } catch (error) {
    console.error("Error analyzing conversation:", error)
    return {
      ticketSuggestion: null,
      insights: [],
      context: await getContextAction()
    }
  }
}

export async function generateTicketDraft(
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
}

export async function suggestNextSteps(messages: Message[]): Promise<string[]> {
  try {
    const context = await getContextAction()
    const prompt = `Based on the conversation and context, suggest 2-3 next steps or actions that would be helpful.
    
    Context Summary: ${context.summary}
    
    Conversation:
    ${messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join("\n")}`

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
}
