"use server"

import { getTicketsForUserAction } from "@/actions/db/tickets-actions"
import { auth } from "@clerk/nextjs/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { TicketList } from "@/components/tickets/ticket-list"
import { redirect } from "next/navigation"

interface Props {
  params: {
    orgId: string
  }
}

export default async function TicketsPage({ params }: Props) {
  const { userId } = await auth()

  if (!userId) {
    return <div>Please sign in to view tickets.</div>
  }

  const result = await getTicketsForUserAction(userId, params.orgId)

  if (!result.isSuccess) {
    if (result.message === "No roles found for this organization") {
      redirect("/dashboard/orgs/create")
    }
    return <div>Error: {result.message}</div>
  }

  return (
    <div className="container mx-auto space-y-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tickets</h1>
          <p className="text-muted-foreground">
            View and manage maintenance tickets
          </p>
        </div>

        <Button asChild>
          <Link href={`/dashboard/orgs/${params.orgId}/tickets/new`}>
            New Ticket
          </Link>
        </Button>
      </div>

      <TicketList tickets={result.data} baseUrl="/staff/tickets" />
    </div>
  )
}
