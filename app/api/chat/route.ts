import { auth } from "@clerk/nextjs/server"
import { OpenAIStream, StreamingTextResponse } from "ai"
import { z } from "zod"

import {
  getChatMessagesAction,
  createChatMessageAction
} from "@/actions/db/chat-actions"
import { getContextAction } from "@/actions/context-actions"
import { Message } from "@/types"
import { openai, withTracing } from "@/lib/langsmith-config"

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

export const POST = withTracing(
  async function POST(req: Request) {
    try {
      const session = await auth()
      if (!session?.userId) {
        return new Response("Unauthorized", { status: 401 })
      }

      const body = await req.json()
      const result = requestSchema.safeParse(body)

      if (!result.success) {
        console.error("Invalid request body:", result.error)
        return new Response("Invalid request", { status: 400 })
      }

      const { messages: clientMessages, sessionId } = result.data

      console.log("Chat request received:", {
        userId: session.userId,
        sessionId,
        messageCount: clientMessages.length
      })

      // Get messages from database
      const { data: dbMessages } = await getChatMessagesAction(sessionId)

      // Combine client messages with db messages, ensuring no duplicates
      const allMessages = Array.from(
        new Map(
          [...(dbMessages || []), ...clientMessages].map(msg => [msg.id, msg])
        ).values()
      ).sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )

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

      // ✅ Monitored: OpenAI streaming completion using traced client
      const response = await openai.chat.completions.create({
        model: "gpt-4o-2024-08-06",
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
  },
  { runType: "api", name: "chat_endpoint" }
)
