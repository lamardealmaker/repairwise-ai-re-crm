"use server"

import { getUserByClerkIdAction } from "@/actions/db/users-actions"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { headers } from "next/headers"

export default async function StaffLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()
  if (!userId) {
    redirect("/login")
  }

  const userResult = await getUserByClerkIdAction(userId)
  const headersList = headers()
  const pathname = headersList.get("x-invoke-path") || "unknown"

  console.log("[Staff Layout]", {
    pathname,
    userId,
    role: userResult.data?.role,
    success: userResult.isSuccess
  })

  // If not a staff user, redirect to tenant pages
  if (
    !userResult.isSuccess ||
    !userResult.data ||
    userResult.data.role !== "staff"
  ) {
    redirect("/tenant/tickets")
  }

  return (
    <div className="min-h-screen">
      <div className="bg-yellow-100 p-2 text-sm">
        Debug - User Role: {userResult.data.role} | Path: {pathname}
      </div>
      <DashboardHeader />
      <main>{children}</main>
    </div>
  )
}
