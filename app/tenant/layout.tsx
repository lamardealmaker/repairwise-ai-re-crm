"use server"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function TenantLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()

  if (!userId) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader userRole="tenant" />
      <main>{children}</main>
    </div>
  )
}
