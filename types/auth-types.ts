/*
<ai_context>
Defines the auth types for the app.
</ai_context>
*/

import { auth } from "@clerk/nextjs/server"

// Extend the auth type to include userId
export type Auth = Awaited<ReturnType<typeof auth>> & {
  userId: string | null
}
