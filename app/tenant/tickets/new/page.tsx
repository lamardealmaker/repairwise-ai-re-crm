"use server"

import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { TicketForm } from "@/components/tickets/ticket-form"
import { getUserOrgIdAction } from "@/actions/db/user-roles-actions"

export default async function NewTicketPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/login")
  }

  // Get the organization ID for the tenant
  const orgResult = await getUserOrgIdAction(userId)
  if (!orgResult.isSuccess || !orgResult.data) {
    redirect("/dashboard/orgs/create")
  }

  const orgId = orgResult.data

  return (
    <div className="container max-w-2xl space-y-6 py-8">
      <div>
        <h1 className="text-3xl font-bold">Submit Maintenance Request</h1>
        <p className="text-muted-foreground">
          Tell us about the issue and our AI will help prioritize and route your
          request
        </p>
      </div>

      <TicketForm orgId={orgId} userRole="TENANT" userId={userId} />
    </div>
  )
}
