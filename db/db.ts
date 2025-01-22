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
  usersTable
} from "@/db/schema"
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
  ssl: process.env.NODE_ENV === "production"
})

const schema = {
  profiles: profilesTable,
  todos: todosTable,
  users: usersTable,
  tickets: ticketsTable,
  ticketMessages: ticketMessagesTable
}

export const db = drizzle(client, { schema })
