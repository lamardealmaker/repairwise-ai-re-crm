"use server"

import { getUserByClerkIdAction } from "@/actions/db/users-actions"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function StaffLayout({
  children
}: {
  children: React.ReactNode
}) {
  try {
    const { userId } = await auth()
    if (!userId) {
      console.log("[Staff Layout] No userId found, redirecting to login")
      redirect("/login")
    }

    // Get user data from Clerk
    const user = await currentUser()
    if (!user) {
      console.error("[Staff Layout] No user found in Clerk")
      redirect("/login")
    }

    // Check database role
    const userResult = await getUserByClerkIdAction(userId)
    console.log("[Staff Layout] User check result:", {
      userId,
      success: userResult.isSuccess,
      role: userResult.data?.role
    })

    if (!userResult.isSuccess || !userResult.data) {
      console.error("[Staff Layout] User not found in database")
      redirect("/login")
    }

    // Verify staff role
    if (userResult.data.role !== "staff") {
      console.log(
        "[Staff Layout] Non-staff user detected, redirecting to tenant dashboard"
      )
      redirect("/tenant/dashboard")
    }

    return (
      <div className="min-h-screen">
        <DashboardHeader />
        <main>{children}</main>
      </div>
    )
  } catch (error) {
    console.error("[Staff Layout] Error:", error)
    redirect("/login")
  }
}
