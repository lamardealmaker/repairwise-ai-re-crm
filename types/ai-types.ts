import { Message } from "./chat-types"

export interface TicketSuggestion {
  title: string
  priority: "low" | "medium" | "high"
  category:
    | "Bug Report"
    | "Feature Request"
    | "Technical Support"
    | "Account Issue"
    | "Billing"
  summary: string
  confidence: number
  relevantMessageIds: string[]
}

export interface ConversationInsight {
  type: "issue" | "request" | "feedback"
  content: string
  confidence: number
}

export interface AIConfig {
  provider: "openai"
  model: "gpt-3.5" | "gpt-4"
  temperature: number
  maxTokens: number
  topP: number
}

export interface AIResponse<T> {
  isSuccess: boolean
  data?: T
  error?: string
}

export type ContextKey =
  | "property_details"
  | "maintenance_history"
  | "previous_issues"
  | "tenant_preferences"
  | "important_dates"
  | "communication_style"

export interface MemoryStore {
  value: string
  timestamp: number
  importance: number
  references: number
}

export interface ConversationContext {
  immediate: Message[]
  relevant: Map<ContextKey, MemoryStore>
  summary: string
}
