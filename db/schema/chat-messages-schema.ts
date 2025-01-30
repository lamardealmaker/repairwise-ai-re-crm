import { pgTable, text, timestamp, uuid, jsonb } from "drizzle-orm/pg-core"
import { chatSessionsTable } from "./chat-sessions-schema"

export const chatMessagesTable = pgTable("chat_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionId: uuid("session_id")
    .references(() => chatSessionsTable.id, { onDelete: "cascade" })
    .notNull(),
  content: text("content").notNull(),
  role: text("role").notNull().$type<"user" | "assistant">(),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export type InsertChatMessage = typeof chatMessagesTable.$inferInsert
export type SelectChatMessage = typeof chatMessagesTable.$inferSelect
