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

  try {
    const userResult = await getUserByClerkIdAction(userId)
    console.log("[Tenant Layout]", {
      userId,
      role: userResult.data?.role,
      success: userResult.isSuccess
    })

    // Only redirect if we successfully got user data and they're not tenant
    if (
      userResult.isSuccess &&
      userResult.data &&
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
  } catch (error) {
    console.error("[Tenant Layout] Database error:", error)
    // On database error, show an error message but don't redirect
    return (
      <div className="min-h-screen">
        <div className="bg-red-100 p-2 text-sm">
          Error loading user data. Please try again later.
        </div>
        <DashboardHeader />
        <main>{children}</main>
      </div>
    )
  }
}
