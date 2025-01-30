import { ChatMessageStore } from "../stores/message-store"
import { ChatRuntimeManager } from "../chat-runtime"

export async function testChatFlow() {
  console.log("=== Starting Chat Flow Test ===")

  // Initialize store and runtime
  const userId = "test_user"
  const store = new ChatMessageStore(userId)
  const runtime = new ChatRuntimeManager(store)

  try {
    // Test 1: Initial Message
    console.log("\n=== Test 1: Initial Message ===")
    await runtime.sendMessage("Hello, I have a maintenance issue")

    // Get thread info
    const thread1 = store.getCurrentThread()
    console.log("Thread state after first message:", {
      threadId: thread1?.id,
      messageCount: thread1?.messages.length,
      lastMessage: thread1?.messages[
        thread1.messages.length - 1
      ]?.content.slice(0, 50)
    })

    // Test 2: Follow-up Message
    console.log("\n=== Test 2: Follow-up Message ===")
    await runtime.sendMessage("My sink is leaking")

    const thread2 = store.getCurrentThread()
    console.log("Thread state after second message:", {
      messageCount: thread2?.messages.length,
      messages: thread2?.messages.map(m => ({
        role: m.role,
        preview: m.content.slice(0, 30)
      }))
    })

    // Test 3: Thread Switching
    console.log("\n=== Test 3: Thread Switching ===")
    const newThreadId = await runtime.createThread()
    await runtime.switchThread(newThreadId)

    // Send message in new thread
    await runtime.sendMessage("Different issue: AC not working")

    // Switch back to first thread
    await runtime.switchThread(thread1!.id)

    const finalThread = store.getCurrentThread()
    console.log("Final thread state:", {
      threadId: finalThread?.id,
      messageCount: finalThread?.messages.length,
      lastMessage: finalThread?.messages[
        finalThread.messages.length - 1
      ]?.content.slice(0, 50)
    })

    console.log("=== Chat Flow Test Complete ===")
  } catch (error) {
    console.error("Test failed:", error)
  }
}
