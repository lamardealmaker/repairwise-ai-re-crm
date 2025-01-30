"use client"

import { useEffect, useState, useMemo } from "react"
import { useAuth } from "@clerk/nextjs"
import { Message } from "@/types/chat-types"
import {
  ContextWindow,
  TicketSuggestion,
  ConversationInsight
} from "@/types/ai-types"
import { sendMessageAction } from "@/actions/chat-actions"
import {
  getContextAction,
  updateContextAction
} from "@/actions/context-actions"
import { ChatMessageStore } from "@/lib/stores/message-store"
import ChatHeader from "./_components/chat-header"
import MessageThread from "./_components/message-thread"
import MessageInput from "./_components/message-input"
import ContextSidebar from "./_components/context-sidebar"

const defaultSettings = {
  enableContext: true,
  enableAttachments: true,
  enableSuggestions: true,
  maxAttachments: 5,
  maxAttachmentSize: 5 * 1024 * 1024, // 5MB
  allowedAttachmentTypes: ["image/*", "application/pdf"]
}

export default function ChatPage() {
  const { userId } = useAuth()
  const messageStore = useMemo(
    () => (userId ? new ChatMessageStore(userId) : null),
    [userId]
  )
  const [currentThread, setCurrentThread] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [context, setContext] = useState<ContextWindow>({
    shortTerm: [],
    longTerm: [],
    metadata: {},
    summary: ""
  })
  const [ticketSuggestion, setTicketSuggestion] =
    useState<TicketSuggestion | null>(null)
  const [insights, setInsights] = useState<ConversationInsight[]>([])

  useEffect(() => {
    if (messageStore) {
      initializeChat()
    }
  }, [messageStore])

  const initializeChat = async () => {
    if (!messageStore) return

    try {
      // Create initial thread if none exists
      const threadId = await messageStore.createThread()
      setCurrentThread(threadId)

      // Load initial context
      const contextResult = await getContextAction()
      if (contextResult.isSuccess) {
        setContext(contextResult.data)
        await messageStore.updateThreadContext(threadId, contextResult.data)
      }
    } catch (error) {
      console.error("Failed to initialize chat:", error)
    }
  }

  const handleSendMessage = async (content: string, attachments?: File[]) => {
    if (!messageStore || !currentThread || !content.trim()) return

    try {
      // Create message object
      const userMessage: Message = {
        id: crypto.randomUUID(),
        sessionId: currentThread,
        content,
        role: "user",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      // Add user message to store
      await messageStore.addMessage(currentThread, userMessage)

      // Update context with user message
      const contextResult = await updateContextAction(userMessage)
      if (contextResult.isSuccess) {
        setContext(contextResult.data)
        await messageStore.updateThreadContext(
          currentThread,
          contextResult.data
        )
      }

      // Send message to AI
      setIsTyping(true)
      const result = await sendMessageAction(content) // Remove attachments for now as it's not properly typed
      setIsTyping(false)

      if (result.isSuccess) {
        // Add AI response to store
        await messageStore.addMessage(currentThread, result.data.message)

        // Update context with AI response
        const aiContextResult = await updateContextAction(result.data.message)
        if (aiContextResult.isSuccess) {
          setContext(aiContextResult.data)
          await messageStore.updateThreadContext(
            currentThread,
            aiContextResult.data
          )
        }

        // Update suggestions and insights
        if (result.data.ticketSuggestion) {
          setTicketSuggestion(result.data.ticketSuggestion)
        }
        if (result.data.insights) {
          setInsights(result.data.insights)
        }
      }
    } catch (error) {
      console.error("Failed to send message:", error)
    }
  }

  const handleClearHistory = async (): Promise<string> => {
    if (!messageStore) return ""
    try {
      const newThreadId = await messageStore.createThread()
      setCurrentThread(newThreadId)
      setContext({
        shortTerm: [],
        longTerm: [],
        metadata: {},
        summary: ""
      })
      setTicketSuggestion(null)
      setInsights([])
      return newThreadId
    } catch (error) {
      console.error("Failed to clear history:", error)
      return ""
    }
  }

  const handleExportChat = () => {
    if (!messageStore || !currentThread) return
    try {
      const thread = messageStore.getThread(currentThread)
      if (!thread) return

      const chatData = {
        messages: thread.messages,
        context: thread.context,
        exportedAt: new Date().toISOString()
      }

      const blob = new Blob([JSON.stringify(chatData, null, 2)], {
        type: "application/json"
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `chat-export-${thread.id}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Failed to export chat:", error)
    }
  }

  const handleCreateTicket = async (): Promise<void> => {
    try {
      // Implement ticket creation logic here
      console.log("Creating ticket...")
    } catch (error) {
      console.error("Failed to create ticket:", error)
    }
  }

  const currentThreadData = currentThread
    ? messageStore?.getThread(currentThread)
    : null

  return (
    <div className="flex h-screen">
      <div className="flex flex-1 flex-col">
        <ChatHeader
          onOpenSidebar={() => setIsSidebarOpen(true)}
          onClearHistory={handleClearHistory}
          onExportChat={handleExportChat}
          settings={defaultSettings}
          onSettingsChange={() => {}}
          context={context}
        />

        <MessageThread
          messages={currentThreadData?.messages || []}
          isTyping={isTyping}
          settings={defaultSettings}
        />

        <MessageInput
          onSendMessage={handleSendMessage}
          isTyping={isTyping}
          settings={defaultSettings}
        />
      </div>

      <ContextSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        ticketSuggestion={ticketSuggestion}
        insights={insights}
        context={context}
        messages={currentThreadData?.messages || []}
        onCreateTicket={handleCreateTicket}
      />
    </div>
  )
}
