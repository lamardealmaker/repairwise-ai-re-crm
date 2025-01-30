import { Message } from "./chat-types"

export interface TicketSuggestion {
  title: string
  priority: "low" | "medium" | "high"
  category: string
  summary: string
  confidence: number
  relevantMessageIds: string[]
}

export interface ConversationInsight {
  type: "issue" | "request" | "feedback"
  content: string
  confidence: number
  context?: string
}

export interface AIConfig {
  provider: "openai"
  model: "gpt-3.5" | "gpt-4" | "gpt-4o-2024-08-06"
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

export interface ContextScore {
  relevance: number // 0-1 score of how relevant this context is
  recency: number // 0-1 score based on how recent this context is
  importance: number // 0-1 score of importance
}

export interface ContextMetadata {
  source: string // Where this context came from (e.g., "message", "ticket", "profile")
  timestamp: number // When this context was last updated
  expiresAt?: number // Optional expiration time
}

export interface ContextItem {
  key: string
  value: string
  metadata: {
    source: string
    timestamp: number
    expiresAt: number
  }
}

export interface ContextWindow {
  shortTerm: Message[]
  longTerm: ContextItem[]
  metadata: Record<string, any>
  summary: string
}
