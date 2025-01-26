"use server"

import { getUserByClerkIdAction } from "@/actions/db/users-actions"
import { getUserRolesAction } from "@/actions/db/user-roles-actions"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function RedirectPage() {
  const { userId } = await auth()
  if (!userId) {
    redirect("/login")
  }

  const userResult = await getUserByClerkIdAction(userId)

  console.log("[Auth Redirect]", {
    userId,
    role: userResult.data?.role,
    success: userResult.isSuccess
  })

  if (userResult.isSuccess && userResult.data?.role === "staff") {
    // Get user's organizations
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
    // Fallback to tickets if no orgs found
    redirect("/staff/tickets")
  } else {
    redirect("/tenant/tickets")
  }
}
