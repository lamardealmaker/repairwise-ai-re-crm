import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core"

export const userRoleEnum = pgEnum("user_role", ["tenant", "staff"])

export const usersTable = pgTable("users", {
  id: text("id").primaryKey().notNull(),
  clerkId: text("clerk_id").notNull().unique(),
  role: userRoleEnum("role").notNull().default("tenant"),
  email: text("email").notNull(),
  fullName: text("full_name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export type InsertUser = typeof usersTable.$inferInsert
export type SelectUser = typeof usersTable.$inferSelect
