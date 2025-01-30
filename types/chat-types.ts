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
  role: "user" | "assistant"
  createdAt: string
  updatedAt: string
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
