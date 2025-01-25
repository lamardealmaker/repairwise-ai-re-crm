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

  // Check if user is tenant
  const userResult = await getUserByClerkIdAction(userId)
  console.log("Tenant check result:", {
    userId,
    success: userResult.isSuccess,
    user: userResult.data,
    role: userResult.data?.role
  })
  if (
    !userResult.isSuccess ||
    !userResult.data ||
    userResult.data.role !== "tenant"
  ) {
    console.log("User is not tenant, redirecting to staff dashboard")
    redirect("/staff/tickets") // Redirect staff users to their dashboard
  }
  return (
    <div className="min-h-screen" data-oid="6bno5.i">
      <DashboardHeader data-oid="0bsnmd5" />
      <main data-oid="q-0otim">{children}</main>
    </div>
  )
}
