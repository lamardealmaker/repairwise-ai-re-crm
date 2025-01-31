"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { Message, Attachment, ChatSettings } from "@/types/chat-types"
import {
  TicketSuggestion,
  ConversationInsight,
  ContextWindow
} from "@/types/ai-types"
import { useChat } from "ai/react"
import { createChatSessionAction } from "@/actions/db/chat-actions"
import MessageThread from "./message-thread"
import MessageInput from "./message-input"
import MessageSkeleton from "./message-skeleton"
import TypingIndicator from "./typing-indicator"
import FeedbackToast from "./feedback-toast"
import ChatHeader from "./chat-header"
import ContextSidebar from "./context-sidebar"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { startNewChatAction } from "@/actions/chat-actions"

interface FeedbackState {
  message: string
  type: "error" | "success" | "info"
}

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
  aiModel: "gpt-4"
}

interface ChatInterfaceProps {
  userId: string
  initialSessionId?: string
  initialMessages?: Message[]
}

export default function ChatInterface({
  userId,
  initialSessionId,
  initialMessages = []
}: ChatInterfaceProps) {
  // Generate a session ID if not provided
  const [sessionId, setSessionId] = useState<string>(() => {
    const newSessionId = initialSessionId || crypto.randomUUID()
    console.log("Initializing chat with session ID:", newSessionId)
    return newSessionId
  })
  const [isLoading, setIsLoading] = useState(false)
  const [feedback, setFeedback] = useState<FeedbackState | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [settings, setSettings] = useState<ChatSettings>(defaultSettings)
  const [messages, setMessages] = useState<Message[]>(initialMessages)

  // Initialize chat session
  useEffect(() => {
    const initializeSession = async () => {
      if (!initialSessionId) {
        console.log("Creating new chat session...")
        const result = await createChatSessionAction({
          userId,
          title: "New Chat"
        })

        if (!result.isSuccess) {
          console.error("Failed to create chat session:", result.message)
          setFeedback({
            type: "error",
            message: "Failed to initialize chat"
          })
        } else {
          console.log("Chat session created:", result.data)
        }
      }
    }

    initializeSession()
  }, [userId, initialSessionId])

  const {
    messages: aiMessages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading: isAiLoading,
    append,
    reload,
    stop,
    setInput
  } = useChat({
    api: "/api/chat",
    id: sessionId,
    initialMessages: initialMessages.map(msg => ({
      id: msg.id,
      content: msg.content,
      role: msg.role,
      createdAt: new Date(msg.createdAt)
    })),
    body: {
      sessionId,
      messages
    },
    onResponse: response => {
      console.log("Chat response received:", {
        status: response.status,
        sessionId
      })
      if (response.status === 401) {
        setFeedback({
          type: "error",
          message: "Please sign in to continue"
        })
      }
    },
    onError: error => {
      console.error("Chat error:", error)
      setFeedback({
        type: "error",
        message: error.message || "Failed to send message"
      })
    }
  })

  // Convert ai/react messages to our Message type
  const convertedMessages: Message[] = aiMessages.map(msg => ({
    id: msg.id,
    sessionId,
    content: msg.content,
    role:
      msg.role === "system" ? "assistant" : (msg.role as "user" | "assistant"),
    createdAt: (msg.createdAt || new Date()).toISOString(),
    updatedAt: (msg.createdAt || new Date()).toISOString()
  }))

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("chatSettings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem("chatSettings", JSON.stringify(settings))
  }, [settings])

  const handleSendMessage = async (content: string, files?: File[]) => {
    if (!content.trim()) return

    console.log("Sending message:", {
      content,
      sessionId,
      existingMessages: messages.length
    })

    try {
      await append(
        {
          content,
          role: "user",
          id: crypto.randomUUID(),
          createdAt: new Date()
        },
        {
          options: {
            body: {
              sessionId,
              messages
            }
          }
        }
      )
    } catch (error) {
      console.error("Error sending message:", error)
      setFeedback({
        type: "error",
        message:
          error instanceof Error ? error.message : "Failed to send message"
      })
    }
  }

  const handleCreateTicket = async () => {
    setFeedback({
      type: "info",
      message: "Creating ticket..."
    })

    try {
      // Your existing ticket creation logic
      setFeedback({
        type: "success",
        message: "Ticket created successfully"
      })
    } catch (error) {
      console.error("Error creating ticket:", error)
      setFeedback({
        type: "error",
        message: "Failed to create ticket"
      })
    }
  }

  const handleSettingsChange = (newSettings: Partial<ChatSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
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

  const handleNewChat = async () => {
    const result = await startNewChatAction()
    if (result.isSuccess) {
      // Clear messages and use new session ID
      setInput("")
      setSessionId(result.data.sessionId)

      // Create new chat session in DB
      const sessionResult = await createChatSessionAction({
        userId,
        title: "New Chat"
      })

      if (!sessionResult.isSuccess) {
        setFeedback({
          type: "error",
          message: "Failed to initialize new chat"
        })
      }
    } else {
      setFeedback({
        type: "error",
        message: "Failed to start new chat"
      })
    }
  }

  return (
    <div className="flex h-full">
      <div className="relative flex h-full flex-1 flex-col">
        <ChatHeader
          onOpenSidebar={() => setIsSidebarOpen(true)}
          onClearHistory={async () => {
            const result = await startNewChatAction()
            if (result.isSuccess) {
              setSessionId(result.data.sessionId)
              return result.data.sessionId
            }
            return sessionId
          }}
          onExportChat={handleExportChat}
          settings={settings}
          onSettingsChange={handleSettingsChange}
        />

        <Button
          variant="ghost"
          size="icon"
          onClick={handleNewChat}
          className="absolute right-4 top-4 z-10"
          title="Start New Chat"
        >
          <PlusCircle className="size-5" />
        </Button>

        <MessageThread
          messages={convertedMessages}
          settings={settings}
          isTyping={isAiLoading}
        />

        {isAiLoading && <TypingIndicator />}

        <MessageInput
          onSendMessage={handleSendMessage}
          isTyping={isAiLoading}
          settings={settings}
        />
      </div>

      <ContextSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        ticketSuggestion={null}
        insights={[]}
        context={undefined}
        messages={messages}
        onCreateTicket={handleCreateTicket}
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
