import { pgTable, text, timestamp, uuid, jsonb } from "drizzle-orm/pg-core"
import { SerializedContextWindow } from "@/lib/utils/context-utils"

export const chatSessionsTable = pgTable("chat_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  metadata: jsonb("metadata")
    .$type<SerializedContextWindow & Record<string, any>>()
    .default({
      shortTerm: "[]",
      longTerm: "[]",
      metadata: {},
      summary: ""
    }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export type InsertChatSession = typeof chatSessionsTable.$inferInsert
export type SelectChatSession = typeof chatSessionsTable.$inferSelect
