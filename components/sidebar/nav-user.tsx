/*
<ai_context>
This client component provides a user button for the sidebar via Clerk.
</ai_context>
*/

"use client"

import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar"
import { UserButton, useUser } from "@clerk/nextjs"
export function NavUser() {
  const { user } = useUser()
  return (
    <SidebarMenu data-oid="_bsygj.">
      <SidebarMenuItem
        className="flex items-center gap-2 font-medium"
        data-oid="55fxbgu"
      >
        <UserButton afterSignOutUrl="/" data-oid="1jrb1.z" />
        {user?.fullName}
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
