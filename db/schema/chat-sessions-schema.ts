import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const chatSessionsTable = pgTable("chat_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  summary: text("summary"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export type InsertChatSession = typeof chatSessionsTable.$inferInsert
export type SelectChatSession = typeof chatSessionsTable.$inferSelect
