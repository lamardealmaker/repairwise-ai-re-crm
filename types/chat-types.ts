export interface Attachment {
  id: string
  name: string
  size: number
  type: string
  url: string
}

export interface Message {
  id: string
  content: string
  role: "assistant" | "user"
  createdAt: string
  attachments?: Attachment[]
}

export interface MessageInputProps {
  onSendMessage: (content: string, files?: File[]) => void
  disabled?: boolean
}

export interface MessageThreadProps {
  messages: Message[]
}
