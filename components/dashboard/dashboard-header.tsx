"use client"

import { UserButton } from "@clerk/nextjs"
import { Building2, Menu, Wrench } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"
import { ThemeSwitcher } from "../utilities/theme-switcher"

interface DashboardHeaderProps {
  userRole: "tenant" | "staff"
}

export function DashboardHeader({ userRole }: DashboardHeaderProps) {
  const pathname = usePathname()
  const isStaff = userRole === "staff"
  const baseUrl = isStaff ? "/staff" : "/tenant"

  const navigation = [
    {
      name: isStaff ? "Maintenance Dashboard" : "My Maintenance Requests",
      href: `${baseUrl}/tickets`,
      icon: Wrench,
      current: pathname.includes("/tickets")
    }
  ]

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-2 font-semibold">
          <Building2 className="size-5" />
          <span>RepairWise</span>
        </div>

        <nav className="flex flex-1 items-center justify-center space-x-6">
          {navigation.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className={`hover:text-primary flex items-center gap-2 text-sm font-medium transition-colors ${
                item.current ? "text-foreground" : "text-foreground/60"
              }`}
            >
              <item.icon className="size-4" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  )
}
