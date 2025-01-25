"use server"

import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/db/db"
import { userRolesTable } from "@/db/schema/user-roles-schema"
import { eq } from "drizzle-orm"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
interface DashboardLayoutProps {
  children: React.ReactNode
  params: {
    orgId: string
  }
}
export default async function DashboardLayout({
  children,
  params
}: DashboardLayoutProps) {
  const { userId } = await auth()
  if (!userId) {
    redirect("/sign-in")
  }
  const pathname = params.orgId

  // Only check for organization if not on create page
  if (!pathname.includes("create")) {
    const [userRole] = await db
      .select({
        id: userRolesTable.id,
        userId: userRolesTable.userId,
        orgId: userRolesTable.orgId
      })
      .from(userRolesTable)
      .where(eq(userRolesTable.userId, userId))
      .limit(1)
    if (!userRole) {
      redirect("/dashboard/orgs/create")
    }
  }
  return (
    <div className="relative h-full" data-oid="-pl.w45">
      <div className="bg-background fixed top-0 z-50 w-full" data-oid="ody43ag">
        <DashboardHeader data-oid="lm.wz6k" />
      </div>
      <div
        className="bg-background fixed left-0 top-[80px] z-40 hidden h-full w-56 flex-col md:flex"
        data-oid="0i6--.t"
      >
        <DashboardSidebar orgId={params.orgId} data-oid="-uo2mki" />
      </div>
      <main className="h-full pt-[80px] md:pl-56" data-oid="u9j.kf3">
        <div className="h-full p-6" data-oid="gofemau">
          {children}
        </div>
      </main>
    </div>
  )
}
