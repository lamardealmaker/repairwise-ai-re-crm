"use server"

import { getUserByClerkIdAction } from "@/actions/db/users-actions"
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

  const userResult = await getUserByClerkIdAction(userId)

  // If not a tenant user, redirect to staff pages
  if (
    !userResult.isSuccess ||
    !userResult.data ||
    userResult.data.role !== "tenant"
  ) {
    redirect("/staff/tickets")
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader />
      <main>{children}</main>
    </div>
  )
}
