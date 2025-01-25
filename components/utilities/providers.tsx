/*
<ai_context>
This client component provides the providers for the app.
</ai_context>
*/

"use client"

import { TooltipProvider } from "@/components/ui/tooltip"
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <TooltipProvider data-oid=":hd89-8">{children}</TooltipProvider>
}
