"use server"

import { getUserByClerkIdAction } from "@/actions/db/users-actions"
import { getUserRolesAction } from "@/actions/db/user-roles-actions"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SelectUserRole } from "@/db/schema"
import { auth } from "@clerk/nextjs/server"
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

    // Check database role
    const userResult = await getUserByClerkIdAction(userId)
    console.log("[Staff Layout] User check result:", {
      userId,
      success: userResult.isSuccess,
      role: userResult.data?.role
    })

    if (!userResult.isSuccess || !userResult.data) {
      console.error("[Staff Layout] User not found in database")
      redirect("/")
    }

    // Get user's organizational roles
    const rolesResult = await getUserRolesAction(userId)
    if (!rolesResult.isSuccess) {
      console.error("[Staff Layout] Failed to get user roles")
      redirect("/")
    }

    // Check if user has any staff-like roles (ADMIN, EMPLOYEE, MAINTENANCE)
    const hasStaffRole = rolesResult.data.some((role: SelectUserRole) =>
      ["ADMIN", "EMPLOYEE", "MAINTENANCE"].includes(role.role)
    )

    if (!hasStaffRole) {
      console.log(
        "[Staff Layout] User has no staff role, redirecting to tenant dashboard"
      )
      redirect("/tenant")
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
