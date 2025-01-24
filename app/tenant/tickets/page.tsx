"use server"

import { getTicketsForUserAction } from "@/actions/db/tickets-actions"
import { auth } from "@clerk/nextjs/server"
import { NewTicketButton } from "./_components/button-wrapper"
import { TicketListWrapper } from "./_components/ticket-list-wrapper"
import { redirect } from "next/navigation"

interface Props {
  params: { orgId: string }
}

export default async function TenantTicketsPage({ params }: Props) {
  const { userId } = await auth()

  if (!userId) {
    return <div>Please sign in to view your tickets.</div>
  }

  const result = await getTicketsForUserAction(userId, params.orgId)

  if (!result.isSuccess) {
    if (result.message === "No roles found for this organization") {
      redirect("/dashboard/orgs/create")
    }
    return <div>Error: {result.message}</div>
  }

  return (
    <div className="container space-y-6 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Tickets</h1>
        <NewTicketButton />
      </div>

      <TicketListWrapper tickets={result.data} />
    </div>
  )
}
