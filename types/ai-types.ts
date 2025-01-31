import { Message } from "./chat-types"
import { TicketCategory, TicketPriority } from "./shared-enums"
import { AnalysisError } from "./error-types"

export interface ConfidenceScore {
  value: number
  threshold: {
    suggest: 0.8 // Minimum score to suggest ticket
    autoCreate: 0.95 // Minimum score for automatic creation
  }
}

export interface TicketAnalysis {
  ticketSuggestion: {
    title: string
    priority: TicketPriority
    category: TicketCategory
    summary: string
    confidence: number
    relevantMessageIds: string[]
  } | null
  insights: Array<{
    type: "issue" | "request" | "feedback"
    content: string
    confidence: number
    context?: string
  }>
}

export interface AnalysisResult {
  isSuccess: boolean
  analysis: TicketAnalysis | null
  error?: AnalysisError
}

/** @deprecated Use TicketAnalysis instead */
export interface TicketSuggestion {
  title: string
  priority: TicketPriority
  category: TicketCategory
  summary: string
  confidence: number
  relevantMessageIds: string[]
}

/** @deprecated Use TicketAnalysis['insights'] instead */
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
  relevance: number
  recency: number
  importance: number
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
  ticketSuggestions: TicketSuggestion[]
  insights: ConversationInsight[]
}
