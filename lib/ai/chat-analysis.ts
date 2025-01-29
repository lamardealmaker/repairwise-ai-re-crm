"use server"

import { Message } from "@/types/chat-types"
import {
  TicketSuggestion,
  ConversationInsight,
  ConversationContext
} from "@/types/ai-types"
import { OpenAIStream, StreamingTextResponse } from "ai"
import { Configuration, OpenAIApi } from "openai-edge"
import { contextManager } from "./context-manager"

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config)

interface AnalysisResult {
  ticketSuggestion: TicketSuggestion | null
  insights: ConversationInsight[]
}

const ANALYSIS_PROMPT = `You are an AI assistant analyzing a customer support conversation for a property management system.
Your task is to:
1. Determine if a support ticket should be created
2. Extract key insights from the conversation
3. Identify the priority and category of the issue
4. Generate a concise summary

Consider the following context:
{context}

Format your response as JSON with the following structure:
{
  "ticketSuggestion": {
    "title": "Brief, specific title",
    "priority": "low" | "medium" | "high",
    "category": "Bug Report" | "Feature Request" | "Technical Support" | "Account Issue" | "Billing",
    "summary": "Concise summary of the issue",
    "confidence": 0.0 to 1.0
  },
  "insights": [
    {
      "type": "issue" | "request" | "feedback",
      "content": "Specific insight",
      "confidence": 0.0 to 1.0
    }
  ]
}

Only suggest creating a ticket if:
1. There's a clear issue or request
2. The conversation indicates need for follow-up
3. The confidence level is above 0.6
4. The issue hasn't been previously resolved (check maintenance history)

Analyze the following conversation:`

export async function analyzeConversation(
  messages: Message[]
): Promise<AnalysisResult> {
  try {
    // Update context with all messages
    let context: ConversationContext | null = null
    for (const message of messages) {
      context = await contextManager.updateContext(message)
    }

    const conversation = messages
      .map(msg => `${msg.role.toUpperCase()}: ${msg.content}`)
      .join("\n")

    const prompt = ANALYSIS_PROMPT.replace(
      "{context}",
      context?.summary || "No previous context available."
    )

    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: prompt
        },
        {
          role: "user",
          content: conversation
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    })

    const result = await response.json()
    const analysis = JSON.parse(result.choices[0].message.content)

    return {
      ticketSuggestion: analysis.ticketSuggestion,
      insights: analysis.insights
    }
  } catch (error) {
    console.error("Error analyzing conversation:", error)
    return {
      ticketSuggestion: null,
      insights: []
    }
  }
}

const TICKET_PROMPT = `You are an AI assistant helping to create a support ticket for a property management system.
Based on the conversation and ticket suggestion, generate a detailed ticket description.

Consider the following context:
{context}

Include:
1. Clear problem statement
2. Steps to reproduce (if applicable)
3. Impact and urgency
4. Any attempted solutions
5. Relevant technical details
6. Suggested next steps
7. References to previous related issues
8. Property-specific details
9. Tenant preferences or requirements
10. Relevant dates or timeline

Title: {title}
Priority: {priority}
Category: {category}

Format the response in markdown.`

export async function generateTicketDraft(
  messages: Message[],
  suggestion: TicketSuggestion
): Promise<StreamingTextResponse> {
  // Get context for relevant messages
  const relevantMessages = messages.filter(msg =>
    suggestion.relevantMessageIds.includes(msg.id)
  )

  let context: ConversationContext | null = null
  for (const message of relevantMessages) {
    context = await contextManager.updateContext(message)
  }

  const conversation = relevantMessages
    .map(msg => `${msg.role.toUpperCase()}: ${msg.content}`)
    .join("\n")

  const prompt = TICKET_PROMPT.replace(
    "{context}",
    context?.summary || "No previous context available."
  )
    .replace("{title}", suggestion.title)
    .replace("{priority}", suggestion.priority)
    .replace("{category}", suggestion.category)

  const response = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: prompt
      },
      {
        role: "user",
        content: conversation
      }
    ],
    temperature: 0.7,
    max_tokens: 1000,
    stream: true
  })

  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}

const NEXT_STEPS_PROMPT = `Based on the conversation and context, suggest 3-5 specific next steps or actions.
These should be concrete, actionable items that would help resolve the tenant's issue.

Consider the following context:
{context}

Focus on:
1. Immediate actions needed
2. Required follow-ups
3. Preventive measures
4. Communication needs
5. Timeline recommendations

Format each suggestion as a bullet point.`

export async function suggestNextSteps(messages: Message[]): Promise<string[]> {
  try {
    // Update context with all messages
    let context: ConversationContext | null = null
    for (const message of messages) {
      context = await contextManager.updateContext(message)
    }

    const conversation = messages
      .map(msg => `${msg.role.toUpperCase()}: ${msg.content}`)
      .join("\n")

    const prompt = NEXT_STEPS_PROMPT.replace(
      "{context}",
      context?.summary || "No previous context available."
    )

    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: prompt
        },
        {
          role: "user",
          content: conversation
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    })

    const result = await response.json()
    const suggestions = result.choices[0].message.content
      .split("\n")
      .filter((line: string) => line.trim().startsWith("-"))
      .map((line: string) => line.trim().substring(2))

    return suggestions
  } catch (error) {
    console.error("Error generating next steps:", error)
    return []
  }
}
