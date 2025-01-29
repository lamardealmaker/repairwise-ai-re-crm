import { auth } from "@clerk/nextjs/server"
import { Configuration, OpenAIApi } from "openai-edge"
import { analyzeConversation } from "@/lib/ai/chat-analysis"

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

    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant for a property management system. Help tenants with their inquiries and issues."
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      stream: false
    })

    const completion = await response.json()
    const content = completion.choices[0].message.content

    return new Response(JSON.stringify({ content }), {
      headers: { "Content-Type": "application/json" }
    })
  } catch (error) {
    console.error("Error in chat API:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
