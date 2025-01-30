export const TicketCategory = {
  Maintenance: "maintenance",
  Billing: "billing",
  NoiseComplaint: "noise_complaint",
  Other: "other"
} as const

export type TicketCategory =
  (typeof TicketCategory)[keyof typeof TicketCategory]

export const TicketPriority = {
  Low: "low",
  Medium: "medium",
  High: "high",
  Critical: "critical"
} as const

export type TicketPriority =
  (typeof TicketPriority)[keyof typeof TicketPriority]
