"use client"

import { useEffect, useState, useMemo } from "react"
import { useAuth } from "@clerk/nextjs"
import { Message } from "@/types/chat-types"
import {
  ContextWindow,
  TicketSuggestion,
  ConversationInsight,
  TicketAnalysis
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
import { createTicketFromAnalysis } from "@/actions/db/tickets-actions"
import { toast } from "sonner"
import { getUserPropertyIdAction } from "@/actions/db/user-roles-actions"

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
  const [propertyId, setPropertyId] = useState<string | null>(null)

  useEffect(() => {
    if (messageStore) {
      initializeChat()
    }
  }, [messageStore])

  useEffect(() => {
    if (userId) {
      loadPropertyId()
    }
  }, [userId])

  const loadPropertyId = async () => {
    if (!userId) return

    const result = await getUserPropertyIdAction(userId)
    if (result.isSuccess && result.data) {
      setPropertyId(result.data)
    }
  }

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

  // Map AI suggested categories to valid database categories
  function mapToValidCategory(
    suggestedCategory: string
  ): "maintenance" | "billing" | "noise_complaint" | "other" {
    const category = suggestedCategory.toLowerCase()

    if (
      category.includes("plumbing") ||
      category.includes("maintenance") ||
      category.includes("repair") ||
      category.includes("fix") ||
      category.includes("broken")
    ) {
      return "maintenance"
    }

    if (
      category.includes("billing") ||
      category.includes("payment") ||
      category.includes("rent") ||
      category.includes("fee")
    ) {
      return "billing"
    }

    if (
      category.includes("noise") ||
      category.includes("complaint") ||
      category.includes("disturbance")
    ) {
      return "noise_complaint"
    }

    return "other"
  }

  const handleCreateTicket = async () => {
    console.log("=== Starting Ticket Creation ===")
    console.log("Current thread:", currentThread)
    console.log("Ticket suggestion:", JSON.stringify(ticketSuggestion, null, 2))
    console.log("Property ID:", propertyId)
    console.log("User ID:", userId)
    console.log("Insights:", JSON.stringify(insights, null, 2))

    if (!currentThread) {
      console.error("❌ No current thread")
      throw new Error("No current thread")
    }

    if (!ticketSuggestion) {
      console.error("❌ No ticket suggestion")
      throw new Error("No ticket suggestion")
    }

    if (!propertyId) {
      console.error("❌ No property ID")
      throw new Error("No property ID")
    }

    if (!userId) {
      console.error("❌ No user ID")
      throw new Error("No user ID")
    }

    try {
      const mappedCategory = mapToValidCategory(ticketSuggestion.category)
      console.log("Original category:", ticketSuggestion.category)
      console.log("Mapped category:", mappedCategory)

      const analysis: TicketAnalysis = {
        ticketSuggestion: {
          title: ticketSuggestion.title,
          summary: ticketSuggestion.summary,
          category: mappedCategory,
          priority: ticketSuggestion.priority,
          confidence: ticketSuggestion.confidence,
          relevantMessageIds: ticketSuggestion.relevantMessageIds
        },
        insights
      }

      console.log(
        "Creating ticket with analysis:",
        JSON.stringify(analysis, null, 2)
      )
      const result = await createTicketFromAnalysis(
        currentThread,
        analysis,
        userId!,
        propertyId
      )

      console.log("Create ticket result:", JSON.stringify(result, null, 2))

      if (!result.isSuccess) {
        console.error("❌ Failed to create ticket:", result.message)
        throw new Error(result.message)
      }

      console.log("✅ Ticket created successfully")
      toast.success("Ticket created successfully")
    } catch (error) {
      console.error("❌ Failed to create ticket:", error)
      toast.error(
        error instanceof Error ? error.message : "Failed to create ticket"
      )
      throw error // Re-throw to be handled by the ContextSidebar
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
          settings={defaultSettings}
          isTyping={isTyping}
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
