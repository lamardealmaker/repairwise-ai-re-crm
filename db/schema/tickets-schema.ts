/*
<ai_context>
Defines the database schema for tickets.
</ai_context>
*/

import {
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid
} from "drizzle-orm/pg-core"
import { usersTable } from "./users-schema"
import { propertiesTable } from "./properties-schema"

export const ticketStatusEnum = pgEnum("ticket_status", [
  "open",
  "in_progress",
  "completed",
  "closed",
  "completed_by_chat"
])

export const ticketCategoryEnum = pgEnum("ticket_category", [
  "maintenance",
  "billing",
  "noise_complaint",
  "other"
])

export const ticketPriorityEnum = pgEnum("ticket_priority", [
  "low",
  "medium",
  "high",
  "critical"
])

export const ticketsTable = pgTable("tickets", {
  id: text("id").primaryKey().notNull(),
  tenantId: text("tenant_id")
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),
  propertyId: uuid("property_id")
    .references(() => propertiesTable.id, { onDelete: "cascade" })
    .notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: ticketStatusEnum("status").notNull().default("open"),
  category: ticketCategoryEnum("category").notNull(),
  priority: ticketPriorityEnum("priority").notNull().default("low"),
  costEstimate: text("cost_estimate"),
  timeEstimate: text("time_estimate"),
  emergencyLevel: text("emergency_level"),
  userTone: text("user_tone"),
  chatHistory: jsonb("chat_history"),
  chatSummary: text("chat_summary"),
  resolutionDetails: text("resolution_details"),
  timeSpent: text("time_spent"),
  costIncurred: text("cost_incurred"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  closedAt: timestamp("closed_at")
})

export type InsertTicket = typeof ticketsTable.$inferInsert
export type SelectTicket = typeof ticketsTable.$inferSelect
