"use server"

import { getOrganizationAction } from "@/actions/db/organizations-actions"
import { getInvitesAction } from "@/actions/db/invites-actions"
import { InviteForm } from "./_components/invite-form"
import { InvitesList } from "./_components/invites-list"
import { Suspense } from "react"
interface InvitePageProps {
  params: {
    orgId: string
  }
}
export default async function InvitePage({ params }: InvitePageProps) {
  const { data: organization } = await getOrganizationAction(params.orgId)
  if (!organization) {
    return <div data-oid="_cf0n19">Organization not found</div>
  }
  return (
    <div className="container mx-auto space-y-8 py-6" data-oid="mqq6d9e">
      <div data-oid="87m-2u.">
        <h1 className="text-2xl font-bold" data-oid="rqjh4ud">
          Invites - {organization.name}
        </h1>
        <p className="text-muted-foreground" data-oid="ed32gaf">
          Invite users to join your organization
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2" data-oid=":ehqjvq">
        <div data-oid="rkfx5mf">
          <InviteForm orgId={params.orgId} data-oid="37x-h7g" />
        </div>

        <div data-oid="a6.i6v_">
          <Suspense
            fallback={<div data-oid="dvlkv:a">Loading invites...</div>}
            data-oid="6c4s1la"
          >
            <InvitesListWrapper orgId={params.orgId} data-oid="7pk773a" />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
async function InvitesListWrapper({ orgId }: { orgId: string }) {
  const { data: invites = [] } = await getInvitesAction(orgId)
  return <InvitesList invites={invites} orgId={orgId} data-oid="5n35idl" />
}
