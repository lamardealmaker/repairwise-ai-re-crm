/*
<ai_context>
This client component provides a list of projects for the sidebar.
</ai_context>
*/

"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar"
import {
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
  type LucideIcon
} from "lucide-react"
export function NavProjects({
  projects
}: {
  projects: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {
  const { isMobile } = useSidebar()
  return (
    <SidebarGroup
      className="group-data-[collapsible=icon]:hidden"
      data-oid="3y6.0tn"
    >
      <SidebarGroupLabel data-oid="fgn:.h0">Projects</SidebarGroupLabel>
      <SidebarMenu data-oid="w_c.mln">
        {projects.map(item => (
          <SidebarMenuItem key={item.name} data-oid="8-5lyr1">
            <SidebarMenuButton asChild data-oid="pm080ce">
              <a href={item.url} data-oid="vhxcd7v">
                <item.icon data-oid="kq:.hrj" />
                <span data-oid="w.1.:ku">{item.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu data-oid="42-vnq.">
              <DropdownMenuTrigger asChild data-oid="j86vyyl">
                <SidebarMenuAction showOnHover data-oid=":uvqc76">
                  <MoreHorizontal data-oid="h1:hf.6" />
                  <span className="sr-only" data-oid="jq07dzx">
                    More
                  </span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
                data-oid="-f:1tem"
              >
                <DropdownMenuItem data-oid="cg1.ko7">
                  <Folder
                    className="text-muted-foreground"
                    data-oid="9u.mtwi"
                  />
                  <span data-oid="07agq2r">View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem data-oid="dee.ls1">
                  <Forward
                    className="text-muted-foreground"
                    data-oid="iiw8gbi"
                  />
                  <span data-oid="w312rr0">Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator data-oid="nslwvk1" />
                <DropdownMenuItem data-oid="xexdo67">
                  <Trash2
                    className="text-muted-foreground"
                    data-oid="4i8p.t6"
                  />
                  <span data-oid="y51ht9i">Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem data-oid="_mq9380">
          <SidebarMenuButton
            className="text-sidebar-foreground/70"
            data-oid="6olp.y."
          >
            <MoreHorizontal
              className="text-sidebar-foreground/70"
              data-oid="dsojrti"
            />
            <span data-oid="okbc3ns">More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
