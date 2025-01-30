import { describe, it, expect, beforeEach, vi } from "vitest"
import { ChatMessageStore } from "@/lib/stores/message-store"
import { db } from "@/db/db"
import { chatMessagesTable } from "@/db/schema"
import type { Message } from "@/types/chat-types"

describe("Chat Flow", () => {
  let messageStore: ChatMessageStore

  beforeEach(() => {
    messageStore = new ChatMessageStore("test_user_id")
    vi.clearAllMocks()
  })

  it("should handle initial message correctly", async () => {
    const testDate = new Date("2024-01-01T00:00:00Z")
    
    // Step 1: Mock thread creation response
    const mockThread = {
      id: "thread_1",
      title: "Test Thread",
      createdAt: testDate,
      updatedAt: testDate,
      messages: [],
      context: {
        shortTerm: [],
        longTerm: [],
        metadata: {},
        summary: ""
      },
      metadata: {}
    }

    const mockThreadInsert = {
      values: vi.fn().mockReturnThis(),
      returning: vi.fn().mockResolvedValue([mockThread])
    }
    vi.spyOn(db, "insert").mockReturnValue(mockThreadInsert as any)

    // Step 2: Create the thread
    const threadId = await messageStore.createThread()
    expect(threadId).toBe("thread_1")

    // Step 3: Mock message creation response
    const mockDbMessage = {
      id: "msg_1",
      sessionId: "thread_1",
      content: "Hello AI",
      role: "user",
      createdAt: testDate,
      updatedAt: testDate,
      metadata: null,
      parentId: null
    }

    const mockMessageInsert = {
      values: vi.fn().mockReturnThis(),
      returning: vi.fn().mockResolvedValue([mockDbMessage])
    }
    vi.spyOn(db, "insert").mockReturnValueOnce(mockMessageInsert as any)

    // Step 4: Add message to thread
    const message: Message = {
      id: "msg_1",
      sessionId: "thread_1",
      content: "Hello AI",
      role: "user",
      createdAt: testDate.toISOString(),
      updatedAt: testDate.toISOString()
    }
    await messageStore.addMessage(threadId, message)

    // Step 5: Verify final state
    const thread = messageStore.getThread(threadId)
    expect(thread).toBeDefined()
    expect(thread?.id).toBe("thread_1")
    expect(thread?.messages).toHaveLength(1)
    expect(thread?.messages[0].content).toBe("Hello AI")
    expect(thread?.messages[0].role).toBe("user")
  })

  it("should maintain context in follow-up messages", async () => {
    const testDate = new Date("2024-01-01T00:00:00Z")
    
    // Step 1: Mock thread creation
    const mockThread = {
      id: "thread_1",
      title: "Test Thread",
      createdAt: testDate,
      updatedAt: testDate,
      messages: [],
      context: {
        shortTerm: [],
        longTerm: [],
        metadata: {},
        summary: ""
      },
      metadata: {}
    }

    const mockThreadInsert = {
      values: vi.fn().mockReturnThis(),
      returning: vi.fn().mockResolvedValue([mockThread])
    }
    vi.spyOn(db, "insert").mockReturnValue(mockThreadInsert as any)

    // Step 2: Create thread
    const threadId = await messageStore.createThread()
    expect(threadId).toBe("thread_1")

    // Step 3: Add first message (user)
    const userMessage: Message = {
      id: "msg_1",
      sessionId: threadId,
      content: "Hello AI",
      role: "user" as const,
      createdAt: testDate.toISOString(),
      updatedAt: testDate.toISOString()
    }

    const mockUserMessageInsert = {
      values: vi.fn().mockReturnThis(),
      returning: vi.fn().mockResolvedValue([{
        ...userMessage,
        createdAt: testDate,
        updatedAt: testDate,
        metadata: null,
        parentId: null
      }])
    }
    vi.spyOn(db, "insert").mockReturnValueOnce(mockUserMessageInsert as any)

    await messageStore.addMessage(threadId, userMessage)

    // Step 4: Add AI response
    const aiMessage: Message = {
      id: "msg_2",
      sessionId: threadId,
      content: "Hello! How can I help you?",
      role: "assistant" as const,
      createdAt: testDate.toISOString(),
      updatedAt: testDate.toISOString(),
      parentId: "msg_1"
    }

    const mockAiMessageInsert = {
      values: vi.fn().mockReturnThis(),
      returning: vi.fn().mockResolvedValue([{
        ...aiMessage,
        createdAt: testDate,
        updatedAt: testDate,
        metadata: null
      }])
    }
    vi.spyOn(db, "insert").mockReturnValueOnce(mockAiMessageInsert as any)

    await messageStore.addMessage(threadId, aiMessage)

    // Step 5: Add follow-up message
    const followUpMessage: Message = {
      id: "msg_3",
      sessionId: threadId,
      content: "What's the weather like?",
      role: "user" as const,
      createdAt: testDate.toISOString(),
      updatedAt: testDate.toISOString()
    }

    const mockFollowUpInsert = {
      values: vi.fn().mockReturnThis(),
      returning: vi.fn().mockResolvedValue([{
        ...followUpMessage,
        createdAt: testDate,
        updatedAt: testDate,
        metadata: null,
        parentId: null
      }])
    }
    vi.spyOn(db, "insert").mockReturnValueOnce(mockFollowUpInsert as any)

    await messageStore.addMessage(threadId, followUpMessage)

    // Step 6: Verify final state
    const thread = messageStore.getThread(threadId)
    expect(thread).toBeDefined()
    expect(thread?.messages).toHaveLength(3)
    expect(thread?.messages[0].content).toBe("Hello AI")
    expect(thread?.messages[0].role).toBe("user")
    expect(thread?.messages[1].content).toBe("Hello! How can I help you?")
    expect(thread?.messages[1].role).toBe("assistant")
    expect(thread?.messages[2].content).toBe("What's the weather like?")
    expect(thread?.messages[2].role).toBe("user")
  })

  it("should handle thread switching correctly", async () => {
    const testDate = new Date("2024-01-01T00:00:00Z")
    
    // Step 1: Mock thread creation responses
    const mockThread1 = {
      id: "thread_1",
      title: "Test Thread 1",
      createdAt: testDate,
      updatedAt: testDate,
      messages: [],
      context: {
        shortTerm: [],
        longTerm: [],
        metadata: {},
        summary: ""
      },
      metadata: {}
    }

    const mockThread2 = {
      ...mockThread1,
      id: "thread_2",
      title: "Test Thread 2"
    }

    const mockThreadInsert = {
      values: vi.fn().mockReturnThis(),
      returning: vi.fn()
        .mockResolvedValueOnce([mockThread1])
        .mockResolvedValueOnce([mockThread2])
    }
    vi.spyOn(db, "insert").mockReturnValue(mockThreadInsert as any)

    // Step 2: Create both threads
    const thread1Id = await messageStore.createThread()
    const thread2Id = await messageStore.createThread()
    expect(thread1Id).toBe("thread_1")
    expect(thread2Id).toBe("thread_2")

    // Step 3: Mock message creation for thread 1
    const thread1Message: Message = {
      id: "msg_1",
      sessionId: thread1Id,
      content: "Thread 1 message",
      role: "user" as const,
      createdAt: testDate.toISOString(),
      updatedAt: testDate.toISOString()
    }

    const mockMessage1Insert = {
      values: vi.fn().mockReturnThis(),
      returning: vi.fn().mockResolvedValue([{
        ...thread1Message,
        createdAt: testDate,
        updatedAt: testDate,
        metadata: null,
        parentId: null
      }])
    }
    vi.spyOn(db, "insert").mockReturnValueOnce(mockMessage1Insert as any)

    await messageStore.addMessage(thread1Id, thread1Message)

    // Step 4: Mock message creation for thread 2
    const thread2Message: Message = {
      id: "msg_2",
      sessionId: thread2Id,
      content: "Thread 2 message",
      role: "user" as const,
      createdAt: testDate.toISOString(),
      updatedAt: testDate.toISOString()
    }

    const mockMessage2Insert = {
      values: vi.fn().mockReturnThis(),
      returning: vi.fn().mockResolvedValue([{
        ...thread2Message,
        createdAt: testDate,
        updatedAt: testDate,
        metadata: null,
        parentId: null
      }])
    }
    vi.spyOn(db, "insert").mockReturnValueOnce(mockMessage2Insert as any)

    await messageStore.addMessage(thread2Id, thread2Message)

    // Step 5: Mock message loading for thread switching
    vi.spyOn(db.query.chatMessages, "findMany").mockImplementation((args: any) => {
      const messages = args.where.sessionId === "thread_1"
        ? [{
            id: "msg_1",
            sessionId: "thread_1",
            content: "Thread 1 message",
            role: "user" as const,
            createdAt: new Date("2024-01-01T00:00:00Z"),
            updatedAt: new Date("2024-01-01T00:00:00Z"),
            metadata: null,
            parentId: null
          }]
        : [{
            id: "msg_2",
            sessionId: "thread_2",
            content: "Thread 2 message",
            role: "user" as const,
            createdAt: new Date("2024-01-01T00:00:00Z"),
            updatedAt: new Date("2024-01-01T00:00:00Z"),
            metadata: null,
            parentId: null
          }]

      return {
        execute: vi.fn().mockResolvedValue(messages)
      } as any
    })

    // Step 6: Test thread switching
    await messageStore.switchThread(thread1Id)
    let thread = messageStore.getThread(thread1Id)
    expect(thread).toBeDefined()
    expect(thread?.messages).toHaveLength(1)
    expect(thread?.messages[0].content).toBe("Thread 1 message")

    await messageStore.switchThread(thread2Id)
    thread = messageStore.getThread(thread2Id)
    expect(thread).toBeDefined()
    expect(thread?.messages).toHaveLength(1)
    expect(thread?.messages[0].content).toBe("Thread 2 message")
  })
}) 
