import { auth } from "@clerk/nextjs/server"
import { OpenAIStream, StreamingTextResponse } from "ai"
import { Configuration, OpenAIApi } from "openai-edge"
import { z } from "zod"

import {
  getChatMessagesAction,
  createChatMessageAction
} from "@/actions/db/chat-actions"
import { getContextAction } from "@/actions/context-actions"
import { Message } from "@/types"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

const requestSchema = z.object({
  messages: z.array(
    z.object({
      id: z.string(),
      content: z.string(),
      role: z.enum(["user", "assistant", "system"]),
      createdAt: z.string()
    })
  ),
  sessionId: z.string().min(1, "Session ID is required")
})

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.userId) {
      return new Response("Unauthorized", { status: 401 })
    }

    const json = await req.json()
    const body = requestSchema.parse(json)
    const { messages: clientMessages, sessionId } = body

    console.log("API Request received:", {
      sessionId,
      userId: session.userId,
      messageCount: clientMessages.length
    })

    // Get the last message from the client
    const lastMessage = clientMessages[clientMessages.length - 1]
    if (!lastMessage || !lastMessage.content) {
      return new Response("No message provided", { status: 400 })
    }

    console.log("Storing user message:", {
      sessionId,
      content: lastMessage.content,
      role: "user"
    })

    // Store the new user message
    const userMessageResult = await createChatMessageAction({
      sessionId,
      content: lastMessage.content,
      role: "user"
    })

    console.log("User message stored:", userMessageResult)

    // Get previous messages from the database
    const { data: dbMessages } = await getChatMessagesAction(sessionId)

    console.log("Retrieved messages from DB:", {
      sessionId,
      messageCount: dbMessages?.length || 0
    })

    // Combine client messages with db messages, ensuring no duplicates
    const allMessages = Array.from(
      new Map(
        [...(dbMessages || []), ...clientMessages].map(msg => [msg.id, msg])
      ).values()
    ).sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )

    console.log("Combined messages:", {
      sessionId,
      totalMessages: allMessages.length,
      fromDb: dbMessages?.length || 0,
      fromClient: clientMessages.length,
      afterDeduplication: allMessages.length
    })

    // Get relevant context
    const { data: context } = await getContextAction()
    const contextMessage = context?.summary
      ? {
          role: "system" as const,
          content: context.summary
        }
      : null

    // Prepare messages for OpenAI
    const apiMessages = [
      ...(contextMessage ? [contextMessage] : []),
      ...allMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ]

    console.log("Sending to OpenAI:", {
      sessionId,
      messageCount: apiMessages.length,
      hasContext: !!contextMessage
    })

    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: apiMessages,
      temperature: 0.7,
      stream: true
    })

    // Store the assistant's response
    const stream = OpenAIStream(response, {
      async onCompletion(completion) {
        console.log("Storing assistant response:", {
          sessionId,
          contentPreview: completion.substring(0, 50)
        })

        const result = await createChatMessageAction({
          sessionId,
          content: completion,
          role: "assistant"
        })

        console.log("Assistant response stored:", result)
      }
    })

    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response(
      error instanceof Error ? error.message : "Internal Server Error",
      { status: 500 }
    )
  }
}
