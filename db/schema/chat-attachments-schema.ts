import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { chatMessagesTable } from "./chat-messages-schema"

export const chatAttachmentsTable = pgTable("chat_attachments", {
  id: uuid("id").defaultRandom().primaryKey(),
  messageId: uuid("message_id")
    .references(() => chatMessagesTable.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  url: text("url").notNull(),
  size: integer("size").notNull(),
  metadata: text("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export type InsertChatAttachment = typeof chatAttachmentsTable.$inferInsert
export type SelectChatAttachment = typeof chatAttachmentsTable.$inferSelect
