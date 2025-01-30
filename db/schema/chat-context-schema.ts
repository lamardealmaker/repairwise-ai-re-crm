import { pgTable, text, timestamp, uuid, jsonb } from "drizzle-orm/pg-core"
import { chatSessionsTable } from "./chat-sessions-schema"
import { ContextItem } from "@/types/ai-types"

export const chatContextTable = pgTable("chat_context", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionId: uuid("session_id")
    .references(() => chatSessionsTable.id, { onDelete: "cascade" })
    .notNull(),
  shortTerm: jsonb("short_term").$type<ContextItem[]>().default([]).notNull(),
  longTerm: jsonb("long_term").$type<ContextItem[]>().default([]).notNull(),
  metadata: jsonb("metadata")
    .$type<Record<string, any>>()
    .default({})
    .notNull(),
  summary: text("summary"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export type InsertChatContext = typeof chatContextTable.$inferInsert
export type SelectChatContext = typeof chatContextTable.$inferSelect
