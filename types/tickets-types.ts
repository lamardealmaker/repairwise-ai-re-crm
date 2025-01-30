import { SelectTicket } from "@/db/schema"

export type TicketStatus =
  | "open"
  | "in_progress"
  | "completed"
  | "closed"
  | "completed_by_chat"
export type TicketPriority = "low" | "medium" | "high" | "critical"
export type TicketCategory =
  | "maintenance"
  | "other"
  | "billing"
  | "noise_complaint"

// Base ticket type that matches the database schema exactly
export type Ticket = SelectTicket

// Extended ticket type for AI-generated tickets
export interface AIGeneratedTicket
  extends Omit<Ticket, "aiGenerated" | "chatSessionId" | "confidenceScore"> {
  chatSessionId: string // Must have a session ID
  aiGenerated: true // Must be true
  confidenceScore: number // Must have a score
}

export interface CreateTicketInput {
  id: string
  tenantId: string
  propertyId: string
  title: string
  description: string
  status: TicketStatus
  category: TicketCategory
  priority: TicketPriority
  // Optional fields
  costEstimate?: string
  timeEstimate?: string
  emergencyLevel?: string
  userTone?: string
  chatHistory?: any // @deprecated - use chatSessionId instead
  chatSummary?: string // @deprecated - use chatSessionId instead
  resolutionDetails?: string
  timeSpent?: string
  costIncurred?: string
  closedAt?: Date
  // New optional fields for AI-generated tickets
  chatSessionId?: string
  aiGenerated?: boolean
  confidenceScore?: number
}

export interface UpdateTicketInput {
  id: string
  status: TicketStatus
  costEstimate?: string
  timeEstimate?: string
  emergencyLevel?: string
  userTone?: string
  chatHistory?: any // @deprecated - use chatSessionId instead
  chatSummary?: string // @deprecated - use chatSessionId instead
  resolutionDetails?: string
  timeSpent?: string
  costIncurred?: string
  confidenceScore?: number
}
