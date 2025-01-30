import { ChatThread, Message, MessageStore } from "@/types/chat-types"
import { ContextWindow } from "@/types/ai-types"
import {
  createChatSessionAction,
  createChatMessageAction,
  getChatMessagesAction,
  updateChatContextAction,
  validateChatSessionAction,
  getChatSessionAction
} from "@/actions/db/chat-actions"
import {
  serializeContext,
  deserializeContext,
  validateContext,
  migrateContext
} from "@/lib/utils/context-utils"
import { db } from "@/db/db"
import { chatSessionsTable } from "@/db/schema"
import { eq } from "drizzle-orm"

interface SessionValidationCache {
  validatedAt: number
  isValid: boolean
}

export class ChatMessageStore implements MessageStore {
  threads: Map<string, ChatThread>
  currentThreadId: string | null
  private messageCache: Map<string, Message[]>
  private validationCache: Map<string, SessionValidationCache>
  private userId: string
  private readonly VALIDATION_TTL = 5 * 60 * 1000 // 5 minutes in milliseconds

  constructor(userId: string) {
    this.threads = new Map()
    this.messageCache = new Map()
    this.validationCache = new Map()
    this.currentThreadId = null
    this.userId = userId
  }

  private async validateSession(sessionId: string): Promise<boolean> {
    // Check cache first
    const cached = this.validationCache.get(sessionId)
    const now = Date.now()

    if (cached && now - cached.validatedAt < this.VALIDATION_TTL) {
      return cached.isValid
    }

    try {
      const result = await validateChatSessionAction(sessionId, this.userId)
      const isValid = result.isSuccess && result.data

      // Update cache
      this.validationCache.set(sessionId, {
        validatedAt: now,
        isValid
      })

      // If valid but not in memory, recover it
      if (isValid && !this.threads.has(sessionId)) {
        await this.recoverSession(sessionId)
      }

      return isValid
    } catch (error) {
      console.error("Error validating session:", error)
      return false
    }
  }

  private async recoverSession(sessionId: string): Promise<void> {
    try {
      // Get session data
      const sessionResult = await getChatSessionAction(sessionId)
      if (!sessionResult.isSuccess) {
        throw new Error(sessionResult.message)
      }

      const session = sessionResult.data

      // Create thread object with basic info
      const thread: ChatThread = {
        id: session.id,
        title: session.title,
        createdAt: session.createdAt.toISOString(),
        updatedAt: session.updatedAt.toISOString(),
        messages: [],
        context: session.metadata
          ? deserializeContext(session.metadata)
          : {
              shortTerm: [],
              longTerm: [],
              metadata: {},
              summary: ""
            },
        metadata: {}
      }

      // Load messages
      const messagesResult = await getChatMessagesAction(session.id)
      if (messagesResult.isSuccess) {
        const messages = messagesResult.data.map(msg => ({
          id: msg.id,
          sessionId: msg.sessionId,
          content: msg.content,
          role: msg.role,
          createdAt: msg.createdAt.toISOString(),
          updatedAt: msg.updatedAt.toISOString()
        }))

        // Update thread and cache
        thread.messages = messages
        this.messageCache.set(session.id, messages)
      }

      // Store recovered thread
      this.threads.set(session.id, thread)
    } catch (error) {
      console.error("Error recovering session:", error)
      throw new Error(
        `Failed to recover session: ${error instanceof Error ? error.message : "Unknown error"}`
      )
    }
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
    // Validate session before proceeding
    if (!(await this.validateSession(threadId))) {
      throw new Error(`Invalid session ID: ${threadId}`)
    }

    console.log("Adding message to store:", {
      threadId,
      messageId: message.id,
      role: message.role,
      contentPreview: message.content.slice(0, 50)
    })

    const thread = this.threads.get(threadId)
    if (!thread) throw new Error(`Thread ${threadId} not found`)

    try {
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

      // Validate and update context with the new message
      const updatedContext: ContextWindow = {
        shortTerm: thread.messages.slice(-5), // Keep last 5 messages for short term context
        longTerm: thread.context.longTerm,
        metadata: thread.context.metadata,
        summary: thread.context.summary
      }

      // Validate the context before serialization
      if (!validateContext(updatedContext)) {
        throw new Error("Invalid context data structure")
      }

      // Serialize the context for storage
      const serializedContext = serializeContext(updatedContext)

      // Update thread context in memory with deserialized data
      thread.context = deserializeContext(serializedContext)
      this.threads.set(threadId, thread)

      // Update context in database
      await updateChatContextAction(threadId, serializedContext)
      console.log("Message store updated successfully")
    } catch (error) {
      console.error("Error in addMessage:", error)
      throw new Error(
        error instanceof Error
          ? `Failed to add message: ${error.message}`
          : "Failed to add message"
      )
    }
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
    // Validate session before switching
    if (!(await this.validateSession(threadId))) {
      throw new Error(`Invalid session ID: ${threadId}`)
    }

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
            shortTerm: messages.slice(-5), // Keep last 5 messages for short term context
            longTerm: [],
            metadata: {},
            summary: ""
          },
          metadata: {}
        }

        // Serialize and validate the initial context
        if (validateContext(thread.context)) {
          const serializedContext = serializeContext(thread.context)
          await updateChatContextAction(threadId, serializedContext)
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

    try {
      // Update thread metadata
      thread.metadata = { ...thread.metadata, ...metadata }
      thread.updatedAt = new Date().toISOString()

      // Create serialized context with updated metadata
      const serializedContext = serializeContext({
        ...thread.context,
        metadata: thread.metadata
      })

      // Update thread context in memory with deserialized data
      thread.context = deserializeContext(serializedContext)
      this.threads.set(threadId, thread)

      // Update context in database
      await updateChatContextAction(threadId, serializedContext)
    } catch (error) {
      console.error("Error updating thread metadata:", error)
      throw new Error(
        error instanceof Error
          ? `Failed to update thread metadata: ${error.message}`
          : "Failed to update thread metadata"
      )
    }
  }

  async updateThreadContext(
    threadId: string,
    context: Partial<ContextWindow>
  ): Promise<void> {
    const thread = this.threads.get(threadId)
    if (!thread) throw new Error(`Thread ${threadId} not found`)

    try {
      // Create a complete context object
      const updatedContext: ContextWindow = {
        ...thread.context,
        ...context
      }

      // Validate the context
      if (!validateContext(updatedContext)) {
        throw new Error("Invalid context data structure")
      }

      // Serialize for storage
      const serializedContext = serializeContext(updatedContext)

      // Update thread context in memory with deserialized data
      thread.context = deserializeContext(serializedContext)
      thread.updatedAt = new Date().toISOString()
      this.threads.set(threadId, thread)

      // Update context in database
      await updateChatContextAction(threadId, serializedContext)
    } catch (error) {
      console.error("Error updating thread context:", error)
      throw new Error(
        error instanceof Error
          ? `Failed to update thread context: ${error.message}`
          : "Failed to update thread context"
      )
    }
  }

  // Helper method to clear caches for testing/memory management
  clearCache(): void {
    this.messageCache.clear()
    this.validationCache.clear()
  }
}
