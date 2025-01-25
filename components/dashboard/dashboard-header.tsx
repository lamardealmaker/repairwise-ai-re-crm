"use client"

import { UserButton } from "@clerk/nextjs"
import {
  Building2,
  Menu,
  Users,
  Wrench,
  Building,
  FileText
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"
import { ThemeSwitcher } from "../utilities/theme-switcher"
import { OrgSwitcher } from "./org-switcher"
import { useEffect, useState } from "react"
import { getUserRolesAction } from "@/actions/db/user-roles-actions"
export function DashboardHeader() {
  const pathname = usePathname()
  const [userRole, setUserRole] = useState<
    "ADMIN" | "EMPLOYEE" | "MAINTENANCE" | "TENANT"
  >()
  const [isLoading, setIsLoading] = useState(true)

  // Extract orgId from pathname
  const orgIdMatch = pathname.match(/\/orgs\/([^\/]+)/)
  const orgId = orgIdMatch ? orgIdMatch[1] : ""
  useEffect(() => {
    async function loadUserRole() {
      if (!orgId) return
      try {
        const { data } = await getUserRolesAction(orgId)
        if (data && data.length > 0) {
          // Get the highest role (ADMIN > EMPLOYEE > MAINTENANCE > TENANT)
          const roles = data.map(r => r.role)
          if (roles.includes("ADMIN")) setUserRole("ADMIN")
          else if (roles.includes("EMPLOYEE")) setUserRole("EMPLOYEE")
          else if (roles.includes("MAINTENANCE")) setUserRole("MAINTENANCE")
          else if (roles.includes("TENANT")) setUserRole("TENANT")
        }
      } catch (error) {
        console.error("Error loading user role:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadUserRole()
  }, [orgId])

  // Define navigation items based on user role
  const navigation = userRole
    ? [
        // Tickets - Everyone can see tickets but with different labels
        {
          name: userRole === "TENANT" ? "My Tickets" : "Tickets",
          href: `/dashboard/orgs/${orgId}/tickets`,
          icon: FileText,
          current: pathname.includes("/tickets"),
          show: true // Show for all roles
        },
        // Properties - Only for admin and employee
        {
          name: "Properties",
          href: `/dashboard/orgs/${orgId}/properties`,
          icon: Building,
          current: pathname.includes("/properties"),
          show: ["ADMIN", "EMPLOYEE"].includes(userRole)
        },
        // Staff - Only for admin
        {
          name: "Staff",
          href: `/dashboard/orgs/${orgId}/staff`,
          icon: Users,
          current: pathname.includes("/staff"),
          show: userRole === "ADMIN"
        }
      ].filter(item => item.show)
    : []
  return (
    <header className="border-b" data-oid="kanzwqn">
      <div
        className="container mx-auto flex h-16 items-center justify-between px-4"
        data-oid="i6ounf-"
      >
        <div className="flex items-center gap-4" data-oid="57ahdae">
          <OrgSwitcher data-oid=":9w7kfu" />
        </div>

        <nav
          className="flex flex-1 items-center justify-center space-x-6"
          data-oid="6-j:e26"
        >
          {!isLoading &&
            navigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className={`hover:text-primary flex items-center gap-2 text-sm font-medium transition-colors ${item.current ? "text-foreground" : "text-foreground/60"}`}
                data-oid="juncfor"
              >
                <item.icon className="size-4" data-oid="0_vi8w2" />
                {item.name}
              </Link>
            ))}
        </nav>

        <div className="flex items-center gap-2" data-oid="9t1yb7w">
          <ThemeSwitcher data-oid="mocrl4f" />
          <UserButton afterSignOutUrl="/" data-oid="i8fkbtz" />
        </div>
      </div>
    </header>
  )
}
