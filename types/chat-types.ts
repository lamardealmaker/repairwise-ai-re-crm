import {
  TicketSuggestion,
  ConversationInsight,
  ContextWindow
} from "./ai-types"

export interface Attachment {
  id: string
  messageId: string
  name: string
  type: string
  url: string
  size: number
  metadata: Record<string, any> | null
  createdAt: string
  updatedAt: string
}

export interface Message {
  id: string
  sessionId: string
  content: string
  role: "user" | "assistant" | "system"
  createdAt: string
  updatedAt: string
  metadata?: Record<string, any>
  parentId?: string
  attachments?: {
    id: string
    name: string
    url: string
    type: string
  }[]
}

export interface MessageInputProps {
  onSendMessage: (content: string, files?: File[]) => void
  disabled?: boolean
}

export interface MessageThreadProps {
  messages: Message[]
  messageAlignment?: "default" | "compact"
}

export interface ChatSettings {
  enableContext: boolean
  enableAttachments: boolean
  enableSuggestions: boolean
  maxAttachments: number
  maxAttachmentSize: number // in bytes
  allowedAttachmentTypes: string[]
  soundEnabled?: boolean
  notificationsEnabled?: boolean
  autoScroll?: boolean
  messageAlignment?: "left" | "right"
  theme?: "light" | "dark" | "system"
  aiModel?: "gpt-3.5" | "gpt-4" | "gpt-4o-2024-08-06"
}

export interface ChatThread {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  messages: Message[]
  context: ContextWindow
  metadata: {
    ticketSuggestion?: TicketSuggestion
    insights?: ConversationInsight[]
    summary?: string
  }
}

export interface MessageStore {
  threads: Map<string, ChatThread>
  currentThreadId: string | null
  addMessage: (threadId: string, message: Message) => Promise<void>
  updateThread: (threadId: string, updates: Partial<ChatThread>) => void
  createThread: (initialMessage?: Message) => Promise<string>
  switchThread: (threadId: string) => Promise<void>
  getCurrentThread: () => ChatThread | null
  getThread: (threadId: string) => ChatThread | null
  getAllThreads: () => ChatThread[]
}

export interface ChatRuntime {
  sendMessage: (content: string, attachments?: File[]) => Promise<void>
  editMessage: (messageId: string, content: string) => Promise<void>
  reloadThread: (threadId?: string) => Promise<void>
  cancelResponse: () => void
  createThread: () => Promise<string>
  switchThread: (threadId: string) => Promise<void>
}
