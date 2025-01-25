/*
<ai_context>
This client component provides a main navigation for the sidebar.
</ai_context>
*/

"use client"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from "@/components/ui/sidebar"
import { ChevronRight, type LucideIcon } from "lucide-react"
export function NavMain({
  items
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  return (
    <SidebarGroup data-oid="5hg9bmi">
      <SidebarGroupLabel data-oid="l213dz7">Platform</SidebarGroupLabel>
      <SidebarMenu data-oid="xuwolwh">
        {items.map(item => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
            data-oid="sxrt3g1"
          >
            <SidebarMenuItem data-oid="7sve4o7">
              <CollapsibleTrigger asChild data-oid="xo9vuaz">
                <SidebarMenuButton tooltip={item.title} data-oid="c-tho7_">
                  {item.icon && <item.icon data-oid="r.cbr9p" />}
                  <span data-oid="2c016bv">{item.title}</span>
                  <ChevronRight
                    className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                    data-oid="aa2mpgt"
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent data-oid="humxs4j">
                <SidebarMenuSub data-oid="iaxz3lq">
                  {item.items?.map(subItem => (
                    <SidebarMenuSubItem key={subItem.title} data-oid="c6ir-0s">
                      <SidebarMenuSubButton asChild data-oid="l.8qf5w">
                        <a href={subItem.url} data-oid="o74ckf8">
                          <span data-oid="_pf9-j.">{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
