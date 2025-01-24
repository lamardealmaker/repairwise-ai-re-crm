/*
<ai_context>
Defines the database schema for invites.
</ai_context>
*/

import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { organizationsTable } from "./organizations-schema"
import { propertiesTable } from "./properties-schema"
import { usersTable } from "./users-schema"
import { orgRoleEnum } from "./user-roles-schema"

export const inviteStatusEnum = pgEnum("invite_status", [
  "PENDING",
  "ACCEPTED",
  "EXPIRED",
  "CANCELED"
])

export const invitesTable = pgTable("invites", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull(),
  orgId: uuid("org_id")
    .references(() => organizationsTable.id, { onDelete: "cascade" })
    .notNull(),
  propertyId: uuid("property_id").references(() => propertiesTable.id, {
    onDelete: "cascade"
  }),
  role: orgRoleEnum("role").notNull(),
  token: text("token").notNull().unique(),
  status: inviteStatusEnum("status").notNull().default("PENDING"),
  expiresAt: timestamp("expires_at").notNull(),
  invitedByUserId: text("invited_by_user_id")
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
})

export type InsertInvite = typeof invitesTable.$inferInsert
export type SelectInvite = typeof invitesTable.$inferSelect
