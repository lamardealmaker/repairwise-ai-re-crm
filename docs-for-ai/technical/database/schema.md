# Database Schema

## Overview
This document details the database schema for the AI Chat Ticket System, including all tables, relationships, and indexes.

## Tables

### chat_sessions
```typescript
import { pgTable, uuid, text, timestamp, boolean } from "drizzle-orm/pg-core"

export const chatSessionsTable = pgTable("chat_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  tenantId: text("tenant_id").notNull(),
  status: text("status").notNull().default("active"),
  hasTicket: boolean("has_ticket").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})
```

### chat_messages
```typescript
import { pgTable, uuid, text, timestamp, jsonb } from "drizzle-orm/pg-core"

export const chatMessagesTable = pgTable("chat_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionId: uuid("session_id")
    .references(() => chatSessionsTable.id, { onDelete: "cascade" })
    .notNull(),
  content: text("content").notNull(),
  role: text("role").notNull(), // 'user' or 'assistant'
  metadata: jsonb("metadata"), // For AI-specific data
  createdAt: timestamp("created_at").defaultNow().notNull()
})
```

### chat_attachments
```typescript
import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core"

export const chatAttachmentsTable = pgTable("chat_attachments", {
  id: uuid("id").defaultRandom().primaryKey(),
  messageId: uuid("message_id")
    .references(() => chatMessagesTable.id, { onDelete: "cascade" })
    .notNull(),
  fileUrl: text("file_url").notNull(),
  fileName: text("file_name").notNull(),
  fileType: text("file_type").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
})
```

### chat_tickets
```typescript
import { pgTable, uuid, timestamp } from "drizzle-orm/pg-core"

export const chatTicketsTable = pgTable("chat_tickets", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionId: uuid("session_id")
    .references(() => chatSessionsTable.id)
    .notNull(),
  ticketId: uuid("ticket_id")
    .references(() => ticketsTable.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
})
```

## Indexes

### Performance Indexes
```sql
CREATE INDEX idx_chat_sessions_tenant ON chat_sessions(tenant_id);
CREATE INDEX idx_chat_messages_session ON chat_messages(session_id);
CREATE INDEX idx_chat_attachments_message ON chat_attachments(message_id);
CREATE INDEX idx_chat_tickets_session ON chat_tickets(session_id);
CREATE INDEX idx_chat_tickets_ticket ON chat_tickets(ticket_id);
```

### Search Indexes
```sql
CREATE INDEX idx_chat_messages_content ON chat_messages USING GIN (to_tsvector('english', content));
```

## Relationships

### One-to-Many
- chat_sessions -> chat_messages
- chat_messages -> chat_attachments

### Many-to-One
- chat_messages -> chat_sessions
- chat_attachments -> chat_messages
- chat_tickets -> chat_sessions
- chat_tickets -> tickets

## Data Types

### Status Types
- active
- resolved
- archived

### Role Types
- user
- assistant

## Constraints

### Foreign Key Constraints
- chat_messages.session_id -> chat_sessions.id
- chat_attachments.message_id -> chat_messages.id
- chat_tickets.session_id -> chat_sessions.id
- chat_tickets.ticket_id -> tickets.id

### Not Null Constraints
- All id fields
- chat_sessions.tenant_id
- chat_sessions.status
- chat_messages.content
- chat_messages.role
- chat_attachments.file_url
- chat_attachments.file_name
- chat_attachments.file_type

## Migrations
Migrations will be handled through Drizzle ORM's migration system. 