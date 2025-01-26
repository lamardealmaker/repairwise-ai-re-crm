"use server"

import { getUserByClerkIdAction } from "@/actions/db/users-actions"
import { getUserRolesAction } from "@/actions/db/user-roles-actions"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function StaffLayout({
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
    console.log("[Staff Layout]", {
      userId,
      role: userResult.data?.role,
      success: userResult.isSuccess
    })

    // Only redirect if we successfully got user data and they're not staff
    if (
      userResult.isSuccess &&
      userResult.data &&
      userResult.data.role !== "staff"
    ) {
      redirect("/tenant/tickets")
    }

    // If we're on the /staff/tickets page, redirect to most recent org
    if (userResult.isSuccess && userResult.data) {
      const rolesResult = await getUserRolesAction(userResult.data.id)
      if (rolesResult.isSuccess && rolesResult.data.length > 0) {
        // If only one org, use that
        if (rolesResult.data.length === 1) {
          redirect(`/dashboard/orgs/${rolesResult.data[0].orgId}/tickets`)
        }
        // If multiple orgs, sort by most recent
        const mostRecentOrg = rolesResult.data.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        )[0]
        redirect(`/dashboard/orgs/${mostRecentOrg.orgId}/tickets`)
      }
      // If no orgs found, let them stay on /staff/tickets
    }

    return (
      <div className="min-h-screen">
        <DashboardHeader />
        <main>{children}</main>
      </div>
    )
  } catch (error) {
    console.error("[Staff Layout] Database error:", error)
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
