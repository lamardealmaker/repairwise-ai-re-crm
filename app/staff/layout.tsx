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
    console.log("No userId found, redirecting to login")
    redirect("/login")
  }

  // Check if user is staff
  const userResult = await getUserByClerkIdAction(userId)
  console.log("Staff check result:", {
    userId,
    success: userResult.isSuccess,
    user: userResult.data,
    role: userResult.data?.role
  })
  if (
    !userResult.isSuccess ||
    !userResult.data ||
    userResult.data.role !== "staff"
  ) {
    console.log("User is not staff, redirecting to home")
    redirect("/") // Redirect non-staff users to home
  }
  return (
    <div className="min-h-screen" data-oid="eesnd7r">
      <DashboardHeader data-oid="n31edjm" />
      <main data-oid="z2.ruae">{children}</main>
    </div>
  )
}
