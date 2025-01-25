"use server"

import { auth } from "@clerk/nextjs/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { redirect } from "next/navigation"
import { db } from "@/db/db"
import { userRolesTable } from "@/db/schema/user-roles-schema"
import { eq } from "drizzle-orm"
import { getStaffMembersAction } from "@/actions/db/user-roles-actions"
import { StaffList } from "./_components/staff-list"
import { Suspense } from "react"
interface Props {
  params: {
    orgId: string
  }
}
async function StaffListFetcher({ orgId }: { orgId: string }) {
  const { data: staff = [] } = await getStaffMembersAction(orgId)
  return <StaffList staff={staff} data-oid="l4j7xcp" />
}
export default async function StaffPage({ params }: Props) {
  const { userId } = await auth()
  if (!userId) {
    return <div data-oid="4mv4:-p">Please sign in to view staff.</div>
  }

  // Check if user is admin
  const [userRole] = await db
    .select({
      id: userRolesTable.id,
      role: userRolesTable.role
    })
    .from(userRolesTable)
    .where(eq(userRolesTable.userId, userId))
    .limit(1)
  if (!userRole || userRole.role !== "ADMIN") {
    redirect(`/dashboard/orgs/${params.orgId}`)
  }
  return (
    <div className="container mx-auto space-y-8 py-6" data-oid="580ykyi">
      <div className="flex items-center justify-between" data-oid="x0uy179">
        <div data-oid="0zbu6mx">
          <h1 className="text-2xl font-bold" data-oid="ax.mpbd">
            Staff Management
          </h1>
          <p className="text-muted-foreground" data-oid="45gk3me">
            Manage staff members and their roles
          </p>
        </div>

        <Button asChild data-oid="6ep5::g">
          <Link
            href={`/dashboard/orgs/${params.orgId}/staff/invite`}
            data-oid="7m:my20"
          >
            Invite Staff
          </Link>
        </Button>
      </div>

      <div className="rounded-md border" data-oid="m28b7i-">
        <div className="p-4" data-oid="9p1iwyv">
          <h2 className="font-semibold" data-oid="x3cqh_i">
            Current Staff
          </h2>
          <p className="text-muted-foreground text-sm" data-oid="yqpejx6">
            Staff members will appear here once they accept their invitations
          </p>
        </div>
        <div className="p-4 pt-0" data-oid="n.pn3oi">
          <Suspense
            fallback={<div data-oid="lqbd58p">Loading staff...</div>}
            data-oid="i_-c7wr"
          >
            <StaffListFetcher orgId={params.orgId} data-oid="arppbxv" />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
