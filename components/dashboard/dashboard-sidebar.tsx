"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Building, Home, Mail, Settings, Ticket, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DashboardSidebarProps {
  orgId: string
}

export function DashboardSidebar({ orgId }: DashboardSidebarProps) {
  const pathname = usePathname()

  const routes = [
    {
      label: "Overview",
      icon: Home,
      href: `/dashboard/orgs/${orgId}`
    },
    {
      label: "Properties",
      icon: Building,
      href: `/dashboard/orgs/${orgId}/properties`
    },
    {
      label: "Tickets",
      icon: Ticket,
      href: `/dashboard/orgs/${orgId}/tickets`
    },
    {
      label: "Staff",
      icon: Users,
      href: `/dashboard/orgs/${orgId}/staff`
    },
    {
      label: "Invites",
      icon: Mail,
      href: `/dashboard/orgs/${orgId}/invite`
    },
    {
      label: "Settings",
      icon: Settings,
      href: `/dashboard/orgs/${orgId}/settings`
    }
  ]

  return (
    <div className="bg-background flex h-full flex-col overflow-y-auto border-r">
      <div className="p-6">
        <h2 className="text-lg font-semibold">Navigation</h2>
      </div>
      <div className="flex-1 px-3 py-2">
        <div className="space-y-1">
          {routes.map(route => (
            <Button
              key={route.href}
              variant={pathname === route.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                pathname === route.href
                  ? "bg-secondary hover:bg-secondary"
                  : "hover:bg-transparent hover:underline"
              )}
              asChild
            >
              <Link href={route.href}>
                <route.icon className="mr-2 size-4" />
                {route.label}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
