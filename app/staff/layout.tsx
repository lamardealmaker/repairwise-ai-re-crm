"use server"

import { getUserByClerkIdAction } from "@/actions/db/users-actions"
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

  // Simple role check
  const userResult = await getUserByClerkIdAction(userId)
  if (
    !userResult.isSuccess ||
    !userResult.data ||
    userResult.data.role !== "staff"
  ) {
    redirect("/")
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader />
      <main>{children}</main>
    </div>
  )
}
