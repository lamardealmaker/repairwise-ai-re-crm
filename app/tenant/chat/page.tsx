"use client"

import { useEffect, useState } from "react"
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
  const [messages, setMessages] = useState<Message[]>([])
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
    if (userId) {
      loadInitialContext()
    }
  }, [userId])

  const loadInitialContext = async () => {
    if (!userId) return
    const result = await getContextAction()
    if (result.isSuccess) {
      setContext(result.data)
    }
  }

  const handleSendMessage = async (content: string, attachments?: File[]) => {
    if (!userId || !content.trim()) return

    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      sessionId: "current-session",
      content,
      role: "user",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setMessages(prev => [...prev, userMessage])

    // Update context with user message
    const contextResult = await updateContextAction(userMessage)
    if (contextResult.isSuccess) {
      setContext(contextResult.data)
    }

    // Send message to AI
    setIsTyping(true)
    const result = await sendMessageAction(content, attachments)
    setIsTyping(false)

    if (result.isSuccess) {
      // Add AI response
      setMessages(prev => [...prev, result.data.message])

      // Update context with AI response
      const aiContextResult = await updateContextAction(result.data.message)
      if (aiContextResult.isSuccess) {
        setContext(aiContextResult.data)
      }

      // Update suggestions and insights
      if (result.data.ticketSuggestion) {
        setTicketSuggestion(result.data.ticketSuggestion)
      }
      if (result.data.insights) {
        setInsights(result.data.insights)
      }
    }
  }

  return (
    <div className="flex h-screen">
      <div className="flex flex-1 flex-col">
        <ChatHeader
          onOpenSidebar={() => setIsSidebarOpen(true)}
          context={context}
        />

        <MessageThread
          messages={messages}
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
      />
    </div>
  )
}
