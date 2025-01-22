import { pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { ticketsTable } from "./tickets-schema"
import { usersTable } from "./users-schema"

export const ticketMessagesTable = pgTable("ticket_messages", {
  id: text("id").primaryKey().notNull(),
  ticketId: text("ticket_id")
    .references(() => ticketsTable.id, { onDelete: "cascade" })
    .notNull(),
  senderId: text("sender_id")
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export type InsertTicketMessage = typeof ticketMessagesTable.$inferInsert
export type SelectTicketMessage = typeof ticketMessagesTable.$inferSelect
