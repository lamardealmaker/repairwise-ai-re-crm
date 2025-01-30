import { ChatThread, Message, MessageStore } from "@/types/chat-types"
import { ContextWindow } from "@/types/ai-types"
import {
  createChatSessionAction,
  createChatMessageAction,
  getChatMessagesAction,
  updateChatContextAction
} from "@/actions/db/chat-actions"

export class ChatMessageStore implements MessageStore {
  threads: Map<string, ChatThread>
  currentThreadId: string | null
  private messageCache: Map<string, Message[]>
  private userId: string

  constructor(userId: string) {
    this.threads = new Map()
    this.messageCache = new Map()
    this.currentThreadId = null
    this.userId = userId
  }

  // Required by MessageStore interface
  updateThread(threadId: string, updates: Partial<ChatThread>): void {
    const thread = this.threads.get(threadId)
    if (!thread) throw new Error(`Thread ${threadId} not found`)

    const updatedThread = {
      ...thread,
      ...updates,
      updatedAt: new Date().toISOString()
    }
    this.threads.set(threadId, updatedThread)
  }

  async addMessage(threadId: string, message: Message): Promise<void> {
    console.log("Adding message to store:", {
      threadId,
      messageId: message.id,
      role: message.role,
      contentPreview: message.content.slice(0, 50)
    })

    const thread = this.threads.get(threadId)
    if (!thread) throw new Error(`Thread ${threadId} not found`)

    // Save to database using server action
    console.log("Saving message to database...")
    const result = await createChatMessageAction({
      sessionId: threadId,
      content: message.content,
      role: message.role as "user" | "assistant"
    })

    if (!result.isSuccess) {
      console.error("Failed to save message:", result.message)
      throw new Error("Failed to save message to database")
    }

    // Update local state
    const dbMessage = result.data
    const formattedMessage: Message = {
      id: dbMessage.id,
      sessionId: dbMessage.sessionId,
      content: dbMessage.content,
      role: dbMessage.role,
      createdAt: dbMessage.createdAt.toISOString(),
      updatedAt: dbMessage.updatedAt.toISOString(),
      metadata:
        typeof dbMessage.metadata === "string"
          ? JSON.parse(dbMessage.metadata)
          : dbMessage.metadata || {}
    }

    // Update cache
    console.log("Updating message cache...")
    const cachedMessages = this.messageCache.get(threadId) || []
    cachedMessages.push(formattedMessage)
    this.messageCache.set(threadId, cachedMessages)

    // Update thread
    thread.messages = cachedMessages
    thread.updatedAt = new Date().toISOString()
    this.threads.set(threadId, thread)

    // Update context with the new message
    const contextUpdate: Partial<ContextWindow> = {
      shortTerm: thread.messages.slice(-5), // Keep last 5 messages for short term context
      longTerm: thread.context.longTerm, // Preserve existing long term context
      metadata: thread.context.metadata,
      summary: thread.context.summary
    }

    await this.updateThreadContext(threadId, contextUpdate)
    console.log("Message store updated successfully")
  }

  async createThread(initialMessage?: Message): Promise<string> {
    console.log("Creating new thread:", {
      userId: this.userId,
      hasInitialMessage: !!initialMessage
    })

    // Create in database using server action
    const result = await createChatSessionAction({
      userId: this.userId,
      title: initialMessage?.content.slice(0, 50) || "New Conversation"
    })

    if (!result.isSuccess) {
      console.error("Failed to create thread:", result.message)
      throw new Error("Failed to create chat session")
    }

    const threadId = result.data.id
    console.log("Thread created:", { threadId })

    const now = new Date().toISOString()

    const newThread: ChatThread = {
      id: threadId,
      title: initialMessage?.content.slice(0, 50) || "New Conversation",
      createdAt: now,
      updatedAt: now,
      messages: [],
      context: {
        shortTerm: [],
        longTerm: [],
        metadata: {},
        summary: ""
      },
      metadata: {}
    }

    // Initialize cache
    this.messageCache.set(threadId, [])
    this.threads.set(threadId, newThread)

    // Add initial message if provided
    if (initialMessage) {
      await this.addMessage(threadId, initialMessage)
    }

    this.currentThreadId = threadId
    return threadId
  }

  async switchThread(threadId: string): Promise<void> {
    console.log("Switching to thread:", threadId)

    // Load messages from database if not in cache
    if (!this.messageCache.has(threadId)) {
      console.log("Thread not in cache, loading from database...")
      const result = await getChatMessagesAction(threadId)
      if (!result.isSuccess) {
        console.error("Failed to load messages:", result.message)
        throw new Error("Failed to load messages")
      }

      const messages = result.data.map(msg => ({
        id: msg.id,
        sessionId: msg.sessionId,
        content: msg.content,
        role: msg.role,
        createdAt: msg.createdAt.toISOString(),
        updatedAt: msg.updatedAt.toISOString()
      }))

      console.log("Loaded messages from database:", {
        count: messages.length,
        firstMessage: messages[0]?.content.slice(0, 50),
        lastMessage: messages[messages.length - 1]?.content.slice(0, 50)
      })

      // Update cache
      this.messageCache.set(threadId, messages)

      // Create thread if it doesn't exist
      if (!this.threads.has(threadId)) {
        console.log("Creating thread in memory...")
        const thread: ChatThread = {
          id: threadId,
          title: messages[0]?.content.slice(0, 50) || "Conversation",
          createdAt: messages[0]?.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          messages,
          context: {
            shortTerm: [],
            longTerm: [],
            metadata: {},
            summary: ""
          },
          metadata: {}
        }

        this.threads.set(threadId, thread)
      }
    }

    this.currentThreadId = threadId
    console.log("Thread switch complete")
  }

  getCurrentThread(): ChatThread | null {
    if (!this.currentThreadId) return null
    return this.getThread(this.currentThreadId)
  }

  getThread(threadId: string): ChatThread | null {
    const thread = this.threads.get(threadId)
    if (!thread) return null

    // Ensure messages are up to date from cache
    const messages = this.messageCache.get(threadId) || []
    return { ...thread, messages }
  }

  getAllThreads(): ChatThread[] {
    return Array.from(this.threads.values()).map(thread => ({
      ...thread,
      messages: this.messageCache.get(thread.id) || []
    }))
  }

  async updateThreadMetadata(
    threadId: string,
    metadata: Record<string, any>
  ): Promise<void> {
    const thread = this.threads.get(threadId)
    if (!thread) throw new Error(`Thread ${threadId} not found`)

    thread.metadata = { ...thread.metadata, ...metadata }
    thread.updatedAt = new Date().toISOString()
    this.threads.set(threadId, thread)

    // Update metadata using server action
    await updateChatContextAction(threadId, { metadata: thread.metadata })
  }

  async updateThreadContext(
    threadId: string,
    context: Partial<ContextWindow>
  ): Promise<void> {
    const thread = this.threads.get(threadId)
    if (!thread) throw new Error(`Thread ${threadId} not found`)

    // Parse any string context arrays back into objects
    const parsedContext = {
      ...context,
      shortTerm: Array.isArray(context.shortTerm) ? context.shortTerm : [],
      longTerm: Array.isArray(context.longTerm) ? context.longTerm : [],
      metadata:
        typeof context.metadata === "string"
          ? JSON.parse(context.metadata)
          : context.metadata || {}
    }

    thread.context = { ...thread.context, ...parsedContext }
    thread.updatedAt = new Date().toISOString()
    this.threads.set(threadId, thread)

    // Update context using server action
    await updateChatContextAction(threadId, parsedContext)
  }

  // Helper method to clear cache for testing/memory management
  clearCache(): void {
    this.messageCache.clear()
  }
}
