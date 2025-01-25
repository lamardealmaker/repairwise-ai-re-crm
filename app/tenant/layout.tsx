"use server"

import { getUserByClerkIdAction } from "@/actions/db/users-actions"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function TenantLayout({
  children
}: {
  children: React.ReactNode
}) {
  try {
    const { userId } = await auth()
    if (!userId) {
      console.log("[Tenant Layout] No userId found, redirecting to login")
      redirect("/login")
    }

    // Get user data from Clerk
    const user = await currentUser()
    if (!user) {
      console.error("[Tenant Layout] No user found in Clerk")
      redirect("/login")
    }

    // Check database role
    const userResult = await getUserByClerkIdAction(userId)
    console.log("[Tenant Layout] User check result:", {
      userId,
      success: userResult.isSuccess,
      role: userResult.data?.role
    })

    if (!userResult.isSuccess || !userResult.data) {
      console.error("[Tenant Layout] User not found in database")
      redirect("/")
    }

    // Verify tenant role
    if (userResult.data.role !== "tenant") {
      console.log(
        "[Tenant Layout] Non-tenant user detected, redirecting to home"
      )
      redirect("/")
    }

    return (
      <div className="min-h-screen">
        <DashboardHeader />
        <main>{children}</main>
      </div>
    )
  } catch (error) {
    console.error("[Tenant Layout] Error:", error)
    redirect("/login")
  }
}
