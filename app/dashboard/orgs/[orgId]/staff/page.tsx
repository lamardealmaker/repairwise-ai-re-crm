"use server"

import { auth } from "@clerk/nextjs/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { redirect } from "next/navigation"
import { db } from "@/db/db"
import { userRolesTable } from "@/db/schema/user-roles-schema"
import { eq } from "drizzle-orm"

interface Props {
  params: {
    orgId: string
  }
}

export default async function StaffPage({ params }: Props) {
  const { userId } = await auth()

  if (!userId) {
    return <div>Please sign in to view staff.</div>
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
    <div className="container mx-auto space-y-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Staff Management</h1>
          <p className="text-muted-foreground">
            Manage staff members and their roles
          </p>
        </div>

        <Button asChild>
          <Link href={`/dashboard/orgs/${params.orgId}/staff/invite`}>
            Invite Staff
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <div className="p-4">
          <h2 className="font-semibold">Current Staff</h2>
          <p className="text-muted-foreground text-sm">
            Staff members will appear here once they accept their invitations
          </p>
        </div>
      </div>
    </div>
  )
}
