/*
<ai_context>
Defines the database schema for properties.
</ai_context>
*/

import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { organizationsTable } from "./organizations-schema"

export const propertiesTable = pgTable("properties", {
  id: uuid("id").defaultRandom().primaryKey(),
  orgId: uuid("org_id")
    .references(() => organizationsTable.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export type InsertProperty = typeof propertiesTable.$inferInsert
export type SelectProperty = typeof propertiesTable.$inferSelect
