"use server"

import { getTicketsByTenantAction } from "@/actions/db/tickets-actions"
import { auth } from "@clerk/nextjs/server"
import { NewTicketButton } from "./_components/button-wrapper"
import { TicketListWrapper } from "./_components/ticket-list-wrapper"

export default async function TenantTicketsPage() {
  const { userId } = await auth()

  if (!userId) {
    return <div>Please sign in to view your tickets.</div>
  }

  const result = await getTicketsByTenantAction(userId)

  return (
    <div className="container space-y-6 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Tickets</h1>
        <NewTicketButton />
      </div>

      <TicketListWrapper tickets={result.isSuccess ? result.data : []} />
    </div>
  )
}
