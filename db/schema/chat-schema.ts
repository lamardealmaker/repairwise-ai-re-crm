import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  jsonb
} from "drizzle-orm/pg-core"

export const chatSessionsTable = pgTable("chat_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  status: text("status").notNull().default("active"),
  hasTicket: boolean("has_ticket").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export const chatMessagesTable = pgTable("chat_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionId: uuid("session_id")
    .references(() => chatSessionsTable.id, { onDelete: "cascade" })
    .notNull(),
  content: text("content").notNull(),
  role: text("role").notNull(), // 'user' or 'assistant'
  metadata: jsonb("metadata"), // For AI-specific data
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export type InsertChatSession = typeof chatSessionsTable.$inferInsert
export type SelectChatSession = typeof chatSessionsTable.$inferSelect
export type InsertChatMessage = typeof chatMessagesTable.$inferInsert
export type SelectChatMessage = typeof chatMessagesTable.$inferSelect
