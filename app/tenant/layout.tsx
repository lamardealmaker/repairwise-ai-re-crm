"use server"

import { getUserByClerkIdAction } from "@/actions/db/users-actions"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { auth, currentUser, clerkClient } from "@clerk/nextjs/server"
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

    // Get Clerk user data to check metadata
    const user = await currentUser()
    const clerk = await clerkClient()

    console.log("[Tenant Layout] Clerk user data:", {
      userId,
      metadata: user?.publicMetadata,
      privateMetadata: user?.privateMetadata
    })

    // Check if user is tenant
    const userResult = await getUserByClerkIdAction(userId)
    console.log("[Tenant Layout] User check result:", {
      userId,
      success: userResult.isSuccess,
      user: userResult.data,
      role: userResult.data?.role
    })

    if (!userResult.isSuccess || !userResult.data) {
      console.log(
        "[Tenant Layout] User not found in database, redirecting to home"
      )
      redirect("/")
    }

    // Ensure role is synced with Clerk metadata
    if (userResult.data.role !== user?.publicMetadata?.role) {
      console.log("[Tenant Layout] Syncing role with Clerk metadata")
      await clerk.users.updateUser(userId, {
        publicMetadata: {
          role: userResult.data.role
        }
      })
    }

    // If user is staff, redirect to staff dashboard
    if (userResult.data.role === "staff") {
      console.log(
        "[Tenant Layout] Staff user detected, redirecting to staff dashboard"
      )
      redirect("/staff/tickets")
    }

    // If user is not a tenant (and not staff), redirect to home
    if (userResult.data.role !== "tenant") {
      console.log(
        "[Tenant Layout] Invalid role detected, redirecting to home. Role:",
        userResult.data.role
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
