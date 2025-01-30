import { ChatRuntime, Message, ChatThread } from "@/types/chat-types"
import { ChatMessageStore } from "@/lib/stores/message-store"
import { sendMessageAction } from "@/actions/chat-actions"
import { analyzeConversation } from "@/lib/ai/chat-analysis"
import { updateContextAction } from "@/actions/context-actions"
import OpenAI from "openai"

export class ChatRuntimeManager implements ChatRuntime {
  private messageStore: ChatMessageStore
  private isProcessing: boolean
  private openai: OpenAI
  private abortController: AbortController | null

  constructor(messageStore: ChatMessageStore) {
    this.messageStore = messageStore
    this.isProcessing = false
    this.abortController = null
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })
  }

  async sendMessage(content: string, attachments?: File[]): Promise<void> {
    if (this.isProcessing) throw new Error("Message processing in progress")

    try {
      this.isProcessing = true
      this.abortController = new AbortController()

      const currentThread = this.messageStore.getCurrentThread()
      if (!currentThread) throw new Error("No active thread")

      // Create and add user message
      const userMessage: Message = {
        id: crypto.randomUUID(),
        sessionId: currentThread.id,
        content,
        role: "user",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      this.messageStore.addMessage(currentThread.id, userMessage)

      // Get AI response
      const result = await sendMessageAction(
        content,
        currentThread.messages,
        attachments
      )

      if (!result.isSuccess) throw new Error(result.message)

      // Add AI message
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        sessionId: currentThread.id,
        content: result.data.message.content,
        role: "assistant",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        parentId: userMessage.id
      }
      this.messageStore.addMessage(currentThread.id, aiMessage)

      // Update thread metadata with analysis results
      if (result.data.ticketSuggestion || result.data.insights) {
        this.messageStore.updateThreadMetadata(currentThread.id, {
          ticketSuggestion: result.data.ticketSuggestion,
          insights: result.data.insights
        })
      }

      // Update context
      const contextResult = await updateContextAction(aiMessage)
      if (contextResult.isSuccess) {
        this.messageStore.updateThreadContext(
          currentThread.id,
          contextResult.data
        )
      }
    } finally {
      this.isProcessing = false
      this.abortController = null
    }
  }

  async editMessage(messageId: string, content: string): Promise<void> {
    const currentThread = this.messageStore.getCurrentThread()
    if (!currentThread) throw new Error("No active thread")

    const messageIndex = currentThread.messages.findIndex(
      m => m.id === messageId
    )
    if (messageIndex === -1) throw new Error("Message not found")

    // Create edited message
    const editedMessage: Message = {
      ...currentThread.messages[messageIndex],
      content,
      updatedAt: new Date().toISOString()
    }

    // Replace message and regenerate subsequent responses
    const newMessages = [
      ...currentThread.messages.slice(0, messageIndex),
      editedMessage
    ]

    this.messageStore.updateThread(currentThread.id, { messages: newMessages })
    await this.reloadThread(currentThread.id)
  }

  async reloadThread(threadId?: string): Promise<void> {
    const targetThread = threadId
      ? this.messageStore.getThread(threadId)
      : this.messageStore.getCurrentThread()

    if (!targetThread) throw new Error("Thread not found")

    // Re-analyze conversation
    const analysis = await analyzeConversation(targetThread.messages)

    this.messageStore.updateThreadMetadata(targetThread.id, {
      ticketSuggestion: analysis.ticketSuggestion || undefined,
      insights: analysis.insights
    })

    // Update context
    const contextResult = await updateContextAction(
      targetThread.messages[targetThread.messages.length - 1]
    )
    if (contextResult.isSuccess) {
      this.messageStore.updateThreadContext(targetThread.id, contextResult.data)
    }
  }

  cancelResponse(): void {
    if (this.abortController) {
      this.abortController.abort()
      this.isProcessing = false
      this.abortController = null
    }
  }

  async createThread(): Promise<string> {
    return this.messageStore.createThread()
  }

  async switchThread(threadId: string): Promise<void> {
    this.messageStore.switchThread(threadId)
  }
}
