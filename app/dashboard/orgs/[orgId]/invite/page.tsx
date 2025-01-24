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
    return <div>Organization not found</div>
  }

  return (
    <div className="container mx-auto space-y-8 py-6">
      <div>
        <h1 className="text-2xl font-bold">Invites - {organization.name}</h1>
        <p className="text-muted-foreground">
          Invite users to join your organization
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <InviteForm orgId={params.orgId} />
        </div>

        <div>
          <Suspense fallback={<div>Loading invites...</div>}>
            <InvitesListWrapper orgId={params.orgId} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

async function InvitesListWrapper({ orgId }: { orgId: string }) {
  const { data: invites = [] } = await getInvitesAction(orgId)
  return <InvitesList invites={invites} orgId={orgId} />
}
