"use server"

import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/db/db"
import { userRolesTable } from "@/db/schema/user-roles-schema"
import { eq } from "drizzle-orm"
import { getOrganizationAction } from "@/actions/db/organizations-actions"
import { DeleteButton } from "./_components/delete-button"

interface Props {
  params: {
    orgId: string
  }
}

export default async function SettingsPage({ params }: Props) {
  const { userId } = await auth()

  if (!userId) {
    return <div>Please sign in to view settings.</div>
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

  const { data: organization } = await getOrganizationAction(params.orgId)

  if (!organization) {
    return <div>Organization not found</div>
  }

  return (
    <div className="container mx-auto space-y-8 py-6">
      <div>
        <h1 className="text-2xl font-bold">Organization Settings</h1>
        <p className="text-muted-foreground">
          Manage your organization settings
        </p>
      </div>

      <div className="grid gap-6">
        <div className="rounded-md border">
          <div className="p-4">
            <h2 className="font-semibold">Organization Details</h2>
            <p className="text-muted-foreground text-sm">
              Basic information about your organization
            </p>
          </div>
          <div className="border-t p-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Organization Name</label>
                <p className="mt-1">{organization.name}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-md border">
          <div className="p-4">
            <h2 className="font-semibold">Danger Zone</h2>
            <p className="text-muted-foreground text-sm">
              Destructive actions that cannot be undone
            </p>
          </div>
          <div className="border-t p-4">
            <DeleteButton />
          </div>
        </div>
      </div>
    </div>
  )
}
