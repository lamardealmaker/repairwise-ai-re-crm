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

export interface Ticket extends SelectTicket {
  id: string
  title: string
  description: string
  category: TicketCategory
  priority: TicketPriority
  status: TicketStatus
  propertyId: string
  userId: string
  createdAt: Date
  updatedAt: Date
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
  costEstimate?: string
  timeEstimate?: string
  emergencyLevel?: string
  userTone?: string
  chatHistory?: any
  chatSummary?: string
  resolutionDetails?: string
  timeSpent?: string
  costIncurred?: string
  closedAt?: Date
}

export interface UpdateTicketInput {
  id: string
  status: TicketStatus
  costEstimate?: string
  timeEstimate?: string
  emergencyLevel?: string
  userTone?: string
  chatHistory?: any
  chatSummary?: string
  resolutionDetails?: string
  timeSpent?: string
  costIncurred?: string
}
