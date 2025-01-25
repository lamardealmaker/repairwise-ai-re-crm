/*
<ai_context>
This client component provides a team switcher for the sidebar.
</ai_context>
*/

"use client"

import { ChevronsUpDown, Plus } from "lucide-react"
import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar"
export function TeamSwitcher({
  teams
}: {
  teams: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}) {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState(teams[0])
  return (
    <SidebarMenu data-oid="d1g_5bh">
      <SidebarMenuItem data-oid="m6nfuse">
        <DropdownMenu data-oid="j1ied.d">
          <DropdownMenuTrigger asChild data-oid="anfg5mu">
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              data-oid="a3lqavy"
            >
              <div
                className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
                data-oid="4u36ilw"
              >
                <activeTeam.logo className="size-4" data-oid=".xgl7iv" />
              </div>
              <div
                className="grid flex-1 text-left text-sm leading-tight"
                data-oid="vx7.s1o"
              >
                <span className="truncate font-semibold" data-oid="woe.a2.">
                  {activeTeam.name}
                </span>
                <span className="truncate text-xs" data-oid="xd9uh-0">
                  {activeTeam.plan}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" data-oid="6c65a_m" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
            data-oid="jtmpxwi"
          >
            <DropdownMenuLabel
              className="text-muted-foreground text-xs"
              data-oid="95uq0fw"
            >
              Teams
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => setActiveTeam(team)}
                className="gap-2 p-2"
                data-oid="d__tz4r"
              >
                <div
                  className="flex size-6 items-center justify-center rounded-sm border"
                  data-oid=".-k4_4_"
                >
                  <team.logo className="size-4 shrink-0" data-oid="cmdxjsq" />
                </div>
                {team.name}
                <DropdownMenuShortcut data-oid="ohccz5v">
                  ⌘{index + 1}
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator data-oid="z-x9tf_" />
            <DropdownMenuItem className="gap-2 p-2" data-oid="roqf.ny">
              <div
                className="bg-background flex size-6 items-center justify-center rounded-md border"
                data-oid="-v1erzm"
              >
                <Plus className="size-4" data-oid="dbiwvvw" />
              </div>
              <div
                className="text-muted-foreground font-medium"
                data-oid="_w:ad1h"
              >
                Add team
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
