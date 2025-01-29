"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { Message } from "@/types/chat-types"
import { TicketSuggestion, ConversationInsight } from "@/types/ai-types"
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

interface FeedbackState {
  message: string
  type: "error" | "success" | "info"
}

interface ChatSettings {
  soundEnabled: boolean
  notificationsEnabled: boolean
  autoScroll: boolean
  messageAlignment: "default" | "compact"
  aiModel: "gpt-3.5" | "gpt-4"
  theme: "light" | "dark" | "system"
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

const DEFAULT_SETTINGS: ChatSettings = {
  soundEnabled: true,
  notificationsEnabled: true,
  autoScroll: true,
  messageAlignment: "default",
  aiModel: "gpt-3.5",
  theme: "system"
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [feedback, setFeedback] = useState<FeedbackState | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [settings, setSettings] = useState<ChatSettings>(DEFAULT_SETTINGS)
  const [ticketSuggestion, setTicketSuggestion] =
    useState<TicketSuggestion | null>(null)
  const [insights, setInsights] = useState<ConversationInsight[]>([])

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("chatSettings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem("chatSettings", JSON.stringify(settings))
  }, [settings])

  // Analyze conversation when messages change
  useEffect(() => {
    const analyze = async () => {
      if (messages.length >= 3) {
        const { ticketSuggestion, insights } =
          await analyzeConversation(messages)
        setTicketSuggestion(ticketSuggestion)
        setInsights(insights)
      }
    }
    analyze()
  }, [messages])

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
    try {
      if (files?.length) {
        validateFiles(files)
      }

      const attachments = files?.map(file => ({
        id: Math.random().toString(),
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file)
      }))

      const newMessage: Message = {
        id: Date.now().toString(),
        content,
        role: "user",
        createdAt: new Date().toISOString(),
        attachments
      }

      setMessages(prev => [...prev, newMessage])

      if (settings.soundEnabled) {
        playSound("send")
      }

      // Simulate AI response
      setIsTyping(true)
      try {
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: "This is a simulated AI response.",
          role: "assistant",
          createdAt: new Date().toISOString()
        }

        setMessages(prev => [...prev, aiResponse])

        if (settings.soundEnabled) {
          playSound("receive")
        }

        if (settings.notificationsEnabled) {
          showNotification("New message received")
        }

        setFeedback({
          type: "success",
          message: "Message sent successfully"
        })
      } catch (error) {
        setFeedback({
          type: "error",
          message: "Failed to get AI response"
        })
        throw error
      } finally {
        setIsTyping(false)
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
      const reader = response.body?.getReader()
      let description = ""

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          description += new TextDecoder().decode(value)
        }
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
    <div className="bg-background flex size-full flex-col">
      <ChatHeader
        onToggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
        onClearHistory={handleClearHistory}
        onExportChat={handleExportChat}
        onCreateTicket={handleCreateTicket}
        settings={settings}
        onSettingsChange={handleSettingsChange}
      />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <div className="p-4">
                <MessageSkeleton />
              </div>
            ) : (
              <MessageThread
                messages={messages}
                messageAlignment={settings.messageAlignment}
              />
            )}
          </AnimatePresence>
        </div>

        <ContextSidebar
          messages={messages}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          ticketSuggestion={ticketSuggestion}
          insights={insights}
          onCreateTicket={handleCreateTicket}
        />
      </div>

      <div className="bg-background border-t p-4">
        <AnimatePresence>
          {isTyping && (
            <div className="mb-2">
              <TypingIndicator />
            </div>
          )}
        </AnimatePresence>
        <MessageInput onSendMessage={handleSendMessage} disabled={isTyping} />
      </div>

      <AnimatePresence>
        {feedback && (
          <FeedbackToast
            message={feedback.message}
            type={feedback.type}
            onDismiss={dismissFeedback}
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
