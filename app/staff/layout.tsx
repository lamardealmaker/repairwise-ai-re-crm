"use server"

import { getUserByClerkIdAction } from "@/actions/db/users-actions"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { auth, currentUser, clerkClient } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function StaffLayout({
  children
}: {
  children: React.ReactNode
}) {
  try {
    // Get auth state
    const { userId } = await auth()
    if (!userId) {
      console.log("[Staff Layout] No userId found, redirecting to login")
      redirect("/login")
    }

    // Get Clerk user data to check metadata
    const user = await currentUser()
    const clerk = await clerkClient()

    console.log("[Staff Layout] Clerk user data:", {
      userId,
      metadata: user?.publicMetadata,
      privateMetadata: user?.privateMetadata
    })

    // Check if user is staff
    const userResult = await getUserByClerkIdAction(userId)
    console.log("[Staff Layout] Database user check:", {
      userId,
      success: userResult.isSuccess,
      user: userResult.data,
      role: userResult.data?.role
    })

    // Verify staff role
    if (!userResult.isSuccess || !userResult.data) {
      console.log(
        "[Staff Layout] User not found in database, redirecting to home"
      )
      redirect("/")
    }

    // Ensure role is synced with Clerk metadata
    if (userResult.data.role !== user?.publicMetadata?.role) {
      console.log("[Staff Layout] Syncing role with Clerk metadata")
      await clerk.users.updateUser(userId, {
        publicMetadata: {
          role: userResult.data.role
        }
      })
    }

    // If user is tenant, redirect to tenant dashboard
    if (userResult.data.role === "tenant") {
      console.log(
        "[Staff Layout] Tenant user detected, redirecting to tenant dashboard"
      )
      redirect("/tenant/tickets")
    }

    // If user is not staff (and not tenant), redirect to home
    if (userResult.data.role !== "staff") {
      console.log(
        "[Staff Layout] Invalid role detected, redirecting to home. Role:",
        userResult.data.role
      )
      redirect("/")
    }

    return (
      <div className="min-h-screen" data-oid="eesnd7r">
        <DashboardHeader data-oid="n31edjm" />
        <main data-oid="z2.ruae">{children}</main>
      </div>
    )
  } catch (error) {
    console.error("[Staff Layout] Error:", error)
    redirect("/login")
  }
}
