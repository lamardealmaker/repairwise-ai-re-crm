"use server"

import { Message } from "@/types/chat-types"
import {
  updateContextAction,
  clearContextAction,
  getContextAction
} from "./context-manager"

export async function testContextManager() {
  // Clear any existing context
  await clearContextAction()

  // Test messages
  const messages: Message[] = [
    {
      id: "1",
      sessionId: "test-session",
      content: "I live in property #A123 and would like to report an issue",
      role: "user",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "2",
      sessionId: "test-session",
      content: "I previously had a leaking faucet that was fixed last month",
      role: "user",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "3",
      sessionId: "test-session",
      content: "I prefer to have maintenance visits in the afternoon",
      role: "user",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]

  // Process each message
  console.log("Processing messages...")
  for (const message of messages) {
    const context = await updateContextAction(message)
    console.log("\nAfter processing message:", message.content)
    console.log("Context window:", {
      shortTermCount: context.shortTerm.length,
      longTermCount: context.longTerm.length,
      summary: context.summary
    })
  }

  // Get final context
  const finalContext = await getContextAction()
  console.log("\nFinal context:")
  console.log("Short-term memory:", finalContext.shortTerm.length, "messages")
  console.log(
    "Long-term memory:",
    finalContext.longTerm.map(item => ({
      key: item.key,
      value: item.value,
      source: item.metadata.source
    }))
  )
  console.log("Summary:", finalContext.summary)

  // Clear context
  await clearContextAction()
  console.log("\nContext cleared")

  return finalContext
}
