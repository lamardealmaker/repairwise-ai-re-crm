ALTER TYPE "role" ADD VALUE 'user';--> statement-breakpoint
ALTER TYPE "role" ADD VALUE 'system';--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chat_context" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid NOT NULL,
	"short_term" jsonb NOT NULL,
	"long_term" jsonb NOT NULL,
	"metadata" jsonb NOT NULL,
	"summary" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "chat_messages" ADD COLUMN "parent_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chat_context" ADD CONSTRAINT "chat_context_session_id_chat_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."chat_sessions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_parent_id_chat_messages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."chat_messages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "chat_sessions" DROP COLUMN IF EXISTS "summary";