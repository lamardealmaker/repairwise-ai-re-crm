import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { chatSessionsTable } from "./chat-sessions-schema"

export const priorityEnum = pgEnum("priority", ["low", "medium", "high"])
export const categoryEnum = pgEnum("category", [
  "Bug Report",
  "Feature Request",
  "Technical Support",
  "Account Issue",
  "Billing"
])
export const statusEnum = pgEnum("status", [
  "open",
  "in_progress",
  "resolved",
  "closed"
])

export const chatTicketsTable = pgTable("chat_tickets", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionId: uuid("session_id")
    .references(() => chatSessionsTable.id, { onDelete: "cascade" })
    .notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  priority: priorityEnum("priority").notNull(),
  category: categoryEnum("category").notNull(),
  status: statusEnum("status").default("open").notNull(),
  metadata: text("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export type InsertChatTicket = typeof chatTicketsTable.$inferInsert
export type SelectChatTicket = typeof chatTicketsTable.$inferSelect
