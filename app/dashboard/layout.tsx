"use server"

import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/db/db"
import { userRolesTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()

  if (!userId) {
    redirect("/login")
  }

  const userRoles = await db
    .select()
    .from(userRolesTable)
    .where(eq(userRolesTable.userId, userId))
    .limit(1)

  if (userRoles.length === 0) {
    redirect("/dashboard/orgs/create")
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader />
      <main>{children}</main>
    </div>
  )
}
