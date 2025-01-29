export interface Attachment {
  id: string
  messageId: string
  name: string
  type: string
  url: string
  size: number
  metadata?: string | null
  createdAt: string
  updatedAt: string
}

export interface Message {
  id: string
  sessionId: string
  content: string
  role: "assistant" | "user"
  metadata?: string | null
  attachments?: Attachment[]
  createdAt: string
  updatedAt: string
}

export interface MessageInputProps {
  onSendMessage: (content: string, files?: File[]) => void
  disabled?: boolean
}

export interface MessageThreadProps {
  messages: Message[]
  messageAlignment?: "default" | "compact"
}
