/*
<ai_context>
Initializes the database connection and schema for the app.
</ai_context>
*/

import {
  profilesTable,
  ticketMessagesTable,
  ticketsTable,
  todosTable,
  usersTable,
  organizationsTable,
  propertiesTable,
  userRolesTable,
  invitesTable
} from "@/db/schema"
import { relations } from "drizzle-orm"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set")
}

const connectionString = process.env.DATABASE_URL

// Log connection attempt without exposing credentials
console.log(
  "Connecting to database:",
  connectionString.replace(/postgres:\/\/[^@]+@/, "postgres://****:****@")
)

const client = postgres(connectionString, {
  prepare: false,
  ssl:
    process.env.NODE_ENV === "production"
      ? {
          rejectUnauthorized: false // Allow self-signed certificates
        }
      : false
})

// Define relations
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

export const invitesRelations = relations(invitesTable, ({ one }) => ({
  organization: one(organizationsTable, {
    fields: [invitesTable.orgId],
    references: [organizationsTable.id]
  }),
  property: one(propertiesTable, {
    fields: [invitesTable.propertyId],
    references: [propertiesTable.id]
  }),
  invitedBy: one(usersTable, {
    fields: [invitesTable.invitedByUserId],
    references: [usersTable.id]
  })
}))

const schema = {
  profiles: profilesTable,
  todos: todosTable,
  users: usersTable,
  tickets: ticketsTable,
  ticketMessages: ticketMessagesTable,
  organizations: organizationsTable,
  properties: propertiesTable,
  userRoles: userRolesTable,
  invites: invitesTable
}

export const db = drizzle(client, { schema })
