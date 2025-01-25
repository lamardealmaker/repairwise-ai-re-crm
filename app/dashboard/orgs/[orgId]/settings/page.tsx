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
    return <div data-oid=".u:rq3t">Please sign in to view settings.</div>
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
    return <div data-oid="k:bv4x3">Organization not found</div>
  }
  return (
    <div className="container mx-auto space-y-8 py-6" data-oid="n_new6v">
      <div data-oid="rfu-ko2">
        <h1 className="text-2xl font-bold" data-oid="tlbb0pl">
          Organization Settings
        </h1>
        <p className="text-muted-foreground" data-oid=".6hyokt">
          Manage your organization settings
        </p>
      </div>

      <div className="grid gap-6" data-oid="vz9fwfb">
        <div className="rounded-md border" data-oid="_746muu">
          <div className="p-4" data-oid="s5mjxra">
            <h2 className="font-semibold" data-oid="_7nvk97">
              Organization Details
            </h2>
            <p className="text-muted-foreground text-sm" data-oid=":fde-fe">
              Basic information about your organization
            </p>
          </div>
          <div className="border-t p-4" data-oid="tt3_ob5">
            <div className="space-y-4" data-oid="udfplcs">
              <div data-oid="bfeyu-d">
                <label className="text-sm font-medium" data-oid="z1m7:um">
                  Organization Name
                </label>
                <p className="mt-1" data-oid="nwpqxl5">
                  {organization.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-md border" data-oid="3eqjygg">
          <div className="p-4" data-oid="-4t2.p6">
            <h2 className="font-semibold" data-oid="q-79bfl">
              Danger Zone
            </h2>
            <p className="text-muted-foreground text-sm" data-oid="ox0a80v">
              Destructive actions that cannot be undone
            </p>
          </div>
          <div className="border-t p-4" data-oid=".z_wq1o">
            <DeleteButton data-oid="qokxl0q" />
          </div>
        </div>
      </div>
    </div>
  )
}
