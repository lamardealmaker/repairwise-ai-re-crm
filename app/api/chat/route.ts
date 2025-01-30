import { auth } from "@clerk/nextjs/server"
import { OpenAIStream, StreamingTextResponse } from "ai"
import { Configuration, OpenAIApi } from "openai-edge"
import {
  getRelevantContextAction,
  updateContextAction
} from "@/lib/ai/context-manager"
import { Message } from "@/types/chat-types"
import { db } from "@/db/db"
import { eq } from "drizzle-orm"
import { chatMessagesTable } from "@/db/schema"
import type { ChatCompletionRequestMessage } from "openai"

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config)

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.userId) {
      return new Response("Unauthorized", { status: 401 })
    }

    const { message, sessionId } = await req.json()

    // Get conversation context
    const messages = await db.query.chatMessages.findMany({
      where: eq(chatMessagesTable.sessionId, sessionId),
      orderBy: (messages, { asc }) => [asc(messages.createdAt)]
    })

    // Update context with the new message
    const context = await updateContextAction({
      id: "temp",
      sessionId,
      content: message,
      role: "user",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })

    // Get relevant context
    const relevantContext = await getRelevantContextAction()
    const contextString = Array.from(relevantContext.entries())
      .map(([key, value]) => `${key}: ${value.value}`)
      .join("\n")

    // Create messages array for OpenAI
    const aiMessages: ChatCompletionRequestMessage[] = [
      {
        role: "system",
        content: `You are an AI assistant for a property management system. Help tenants with their inquiries and issues.
        
Current Context:
${contextString}

Guidelines:
1. Use the provided context to give relevant responses
2. If addressing property-specific issues, reference relevant details from context
3. Be professional but friendly
4. If suggesting a ticket, be clear about priority and category
5. Keep responses concise but informative`
      },
      ...messages.map(msg => ({
        role: msg.role === "assistant" ? "assistant" : "user",
        content: msg.content
      })),
      {
        role: "user",
        content: message
      }
    ]

    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: aiMessages,
      temperature: 0.7,
      stream: true
    })

    // Convert the response to a stream
    const stream = OpenAIStream(response)

    // Return the stream
    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error("Error in chat API:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
