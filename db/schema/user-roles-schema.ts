/*
<ai_context>
Defines the database schema for user roles.
</ai_context>
*/

import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { organizationsTable } from "./organizations-schema"
import { propertiesTable } from "./properties-schema"
import { usersTable } from "./users-schema"

export const orgRoleEnum = pgEnum("org_role_type", [
  "ADMIN",
  "EMPLOYEE",
  "MAINTENANCE",
  "TENANT"
])

export const userRolesTable = pgTable("user_roles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),
  orgId: uuid("org_id")
    .references(() => organizationsTable.id, { onDelete: "cascade" })
    .notNull(),
  propertyId: uuid("property_id").references(() => propertiesTable.id, {
    onDelete: "cascade"
  }),
  role: orgRoleEnum("role").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
})

export const userRolesRelations = relations(userRolesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [userRolesTable.userId],
    references: [usersTable.id]
  }),
  organization: one(organizationsTable, {
    fields: [userRolesTable.orgId],
    references: [organizationsTable.id]
  }),
  property: one(propertiesTable, {
    fields: [userRolesTable.propertyId],
    references: [propertiesTable.id]
  })
}))

export type InsertUserRole = typeof userRolesTable.$inferInsert
export type SelectUserRole = typeof userRolesTable.$inferSelect
