-- Create chat sessions table
CREATE TABLE IF NOT EXISTS "chat_sessions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" text NOT NULL,
  "title" text NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

-- Create chat messages table
CREATE TABLE IF NOT EXISTS "chat_messages" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "session_id" uuid NOT NULL,
  "content" text NOT NULL,
  "role" text NOT NULL,
  "metadata" jsonb DEFAULT '{}',
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "chat_messages_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "chat_sessions"("id") ON DELETE CASCADE
);

-- Create chat attachments table
CREATE TABLE IF NOT EXISTS "chat_attachments" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "message_id" uuid NOT NULL,
  "name" text NOT NULL,
  "type" text NOT NULL,
  "url" text NOT NULL,
  "size" integer NOT NULL,
  "metadata" text,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "chat_attachments_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "chat_messages"("id") ON DELETE CASCADE
);

-- Create chat context table
CREATE TABLE IF NOT EXISTS "chat_context" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "session_id" uuid NOT NULL,
  "short_term" jsonb DEFAULT '[]',
  "long_term" jsonb DEFAULT '[]',
  "metadata" jsonb DEFAULT '{}',
  "summary" text,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "chat_context_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "chat_sessions"("id") ON DELETE CASCADE
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS "chat_messages_session_id_idx" ON "chat_messages"("session_id");
CREATE INDEX IF NOT EXISTS "chat_attachments_message_id_idx" ON "chat_attachments"("message_id");
CREATE INDEX IF NOT EXISTS "chat_context_session_id_idx" ON "chat_context"("session_id"); 