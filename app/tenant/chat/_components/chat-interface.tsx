"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { Message, Attachment, ChatSettings } from "@/types/chat-types"
import {
  TicketSuggestion,
  ConversationInsight,
  ContextWindow
} from "@/types/ai-types"
import {
  analyzeConversation,
  generateTicketDraft,
  suggestNextSteps
} from "@/lib/ai/chat-analysis"
import MessageThread from "./message-thread"
import MessageInput from "./message-input"
import MessageSkeleton from "./message-skeleton"
import TypingIndicator from "./typing-indicator"
import FeedbackToast from "./feedback-toast"
import ChatHeader from "./chat-header"
import ContextSidebar from "./context-sidebar"
import {
  createChatSessionAction,
  createChatMessageAction,
  createChatAttachmentAction,
  getChatMessagesAction
} from "@/actions/db/chat-actions"
import { useChat } from "ai/react"
import { sendMessageAction } from "@/actions/chat-actions"
import {
  getContextAction,
  updateContextAction
} from "@/actions/context-actions"

interface FeedbackState {
  message: string
  type: "error" | "success" | "info"
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const MAX_FILES = 5
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/pdf",
  "text/plain"
]

const defaultSettings: ChatSettings = {
  enableContext: true,
  enableAttachments: true,
  enableSuggestions: true,
  maxAttachments: 5,
  maxAttachmentSize: 5 * 1024 * 1024, // 5MB
  allowedAttachmentTypes: ["image/*", "application/pdf"],
  soundEnabled: true,
  notificationsEnabled: true,
  autoScroll: true,
  messageAlignment: "left",
  theme: "system",
  aiModel: "gpt-4o-2024-08-06"
}

interface ChatInterfaceProps {
  userId: string
  initialSessionId?: string
  initialMessages?: Message[]
}

interface ContextSidebarProps {
  messages: Message[]
  isOpen: boolean
  onClose: () => void
  ticketSuggestion: TicketSuggestion | null
  insights: ConversationInsight[]
  onCreateTicket: () => Promise<void>
}

export default function ChatInterface({
  userId,
  initialSessionId,
  initialMessages = []
}: ChatInterfaceProps) {
  const [sessionId, setSessionId] = useState<string | undefined>(
    initialSessionId
  )
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [feedback, setFeedback] = useState<FeedbackState | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [settings, setSettings] = useState<ChatSettings>(defaultSettings)
  const [ticketSuggestion, setTicketSuggestion] =
    useState<TicketSuggestion | null>(null)
  const [insights, setInsights] = useState<ConversationInsight[]>([])
  const [context, setContext] = useState<ContextWindow>({
    shortTerm: [],
    longTerm: [],
    metadata: {},
    summary: ""
  })

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("chatSettings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  // Debug: Log messages when they change
  useEffect(() => {
    console.log("Current messages state:", messages)
  }, [messages])

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem("chatSettings", JSON.stringify(settings))
  }, [settings])

  // Analyze conversation when messages change
  useEffect(() => {
    const analyze = async () => {
      if (messages.length >= 3) {
        const {
          ticketSuggestion,
          insights,
          context: newContext
        } = await analyzeConversation(messages)
        setTicketSuggestion(ticketSuggestion)
        setInsights(insights)
        setContext(newContext)
      }
    }
    analyze()
  }, [messages])

  // Load messages from database when session exists
  useEffect(() => {
    const loadMessages = async () => {
      if (sessionId) {
        console.log("Loading messages for session:", sessionId)
        const result = await getChatMessagesAction(sessionId)
        if (result.isSuccess) {
          const formattedMessages = result.data
            .sort(
              (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
            )
            .map(msg => ({
              id: msg.id,
              sessionId: msg.sessionId,
              content: msg.content,
              role: msg.role,
              createdAt: msg.createdAt.toISOString(),
              updatedAt: msg.updatedAt.toISOString()
            }))
          console.log("Loaded messages:", {
            count: formattedMessages.length,
            firstMessage: formattedMessages[0]?.content.slice(0, 50),
            lastMessage: formattedMessages[
              formattedMessages.length - 1
            ]?.content.slice(0, 50)
          })
          setMessages(formattedMessages)
        }
      }
    }
    loadMessages()
  }, [sessionId])

  const validateFiles = (files: File[]) => {
    if (files.length > MAX_FILES) {
      throw new Error(`Maximum ${MAX_FILES} files allowed`)
    }

    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        throw new Error(`File ${file.name} exceeds maximum size of 5MB`)
      }
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        throw new Error(`File type ${file.type} not supported`)
      }
    }
  }

  const handleSendMessage = async (content: string, files?: File[]) => {
    if (!userId || !content.trim()) return

    try {
      let currentSessionId = sessionId

      console.log("Starting message send with history:", {
        existingMessages: messages.length,
        newContent: content.slice(0, 50)
      })

      // Create session if doesn't exist
      if (!currentSessionId) {
        const { data: newSession, isSuccess } = await createChatSessionAction({
          userId,
          title: content.slice(0, 50)
        })

        if (isSuccess && newSession) {
          currentSessionId = newSession.id
          setSessionId(newSession.id)
        } else {
          throw new Error("Failed to create chat session")
        }
      }

      // Create user message in DB
      const { data: newMessage, isSuccess: messageSuccess } =
        await createChatMessageAction({
          sessionId: currentSessionId,
          content,
          role: "user"
        })

      if (!messageSuccess || !newMessage) {
        throw new Error("Failed to send message")
      }

      // Create message object
      const userMessage: Message = {
        id: newMessage.id,
        sessionId: currentSessionId,
        content: newMessage.content,
        role: newMessage.role,
        createdAt: newMessage.createdAt.toISOString(),
        updatedAt: newMessage.updatedAt.toISOString()
      }

      // Update messages state with user message
      const updatedMessages = [...messages, userMessage]
      setMessages(updatedMessages)

      // Log the current conversation state
      console.log("Current conversation state:", {
        messageCount: updatedMessages.length,
        lastUserMessage: userMessage.content.slice(0, 50)
      })

      // Update context with user message
      const contextResult = await updateContextAction(userMessage)
      if (contextResult.isSuccess) {
        setContext(contextResult.data)
      }

      // Send message to AI and get response
      setIsTyping(true)
      const result = await sendMessageAction(content, updatedMessages, files)
      setIsTyping(false)

      if (result.isSuccess) {
        // Create AI message in DB
        const { data: aiMessage } = await createChatMessageAction({
          sessionId: currentSessionId,
          content: result.data.message.content,
          role: "assistant"
        })

        if (aiMessage) {
          // Add AI response to messages state
          const formattedAiMessage: Message = {
            id: aiMessage.id,
            sessionId: currentSessionId,
            content: aiMessage.content,
            role: aiMessage.role,
            createdAt: aiMessage.createdAt.toISOString(),
            updatedAt: aiMessage.updatedAt.toISOString()
          }

          // Update messages with AI response
          const messagesWithAiResponse = [
            ...updatedMessages,
            formattedAiMessage
          ]
          setMessages(messagesWithAiResponse)

          // Log the final conversation state
          console.log("Final conversation state:", {
            totalMessages: messagesWithAiResponse.length,
            lastAiResponse: formattedAiMessage.content.slice(0, 50)
          })

          // Update context with AI response
          const aiContextResult = await updateContextAction(formattedAiMessage)
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

          if (settings.soundEnabled) {
            playSound("receive")
          }

          if (settings.notificationsEnabled) {
            showNotification("New message received")
          }
        }
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setFeedback({
        type: "error",
        message:
          error instanceof Error ? error.message : "Failed to send message"
      })
    }
  }

  const handleSettingsChange = (newSettings: Partial<ChatSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }

  const handleClearHistory = () => {
    setMessages([])
    setFeedback({
      type: "info",
      message: "Chat history cleared"
    })
  }

  const handleExportChat = () => {
    try {
      const chatData = {
        messages,
        exportedAt: new Date().toISOString()
      }
      const blob = new Blob([JSON.stringify(chatData, null, 2)], {
        type: "application/json"
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `chat-export-${new Date().toISOString()}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setFeedback({
        type: "success",
        message: "Chat exported successfully"
      })
    } catch (error) {
      setFeedback({
        type: "error",
        message: "Failed to export chat"
      })
    }
  }

  const handleCreateTicket = async () => {
    if (!ticketSuggestion) return

    setFeedback({
      type: "info",
      message: "Creating ticket..."
    })

    try {
      const response = await generateTicketDraft(messages, ticketSuggestion)
      const reader = response.getReader()
      let description = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        description += new TextDecoder().decode(value)
      }

      // Here you would integrate with your ticketing system
      // For now, we'll just show a success message
      setFeedback({
        type: "success",
        message: "Ticket created successfully"
      })

      // Clear the suggestion after creating the ticket
      setTicketSuggestion(null)
    } catch (error) {
      console.error("Error creating ticket:", error)
      setFeedback({
        type: "error",
        message: "Failed to create ticket"
      })
    }
  }

  const dismissFeedback = () => {
    setFeedback(null)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev)
  }

  return (
    <div className="flex h-full">
      <div className="flex-1">
        <ChatHeader
          onOpenSidebar={() => setIsSidebarOpen(true)}
          context={context}
        />

        <MessageThread
          messages={messages}
          isTyping={isTyping}
          settings={settings}
        />

        <MessageInput
          onSendMessage={handleSendMessage}
          isTyping={isTyping}
          settings={settings}
        />

        <AnimatePresence>
          {feedback && (
            <FeedbackToast
              message={feedback.message}
              type={feedback.type}
              onClose={() => setFeedback(null)}
            />
          )}
        </AnimatePresence>
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

// Helper functions
function playSound(type: "send" | "receive") {
  // This would be implemented with actual sound effects
  console.log(`Playing ${type} sound`)
}

function showNotification(message: string) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("AI Chat", {
      body: message,
      icon: "/favicon.ico"
    })
  }
}
