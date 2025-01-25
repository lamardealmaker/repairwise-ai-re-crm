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
    return <div data-oid="zqba48r">Please sign in to view tickets.</div>
  }
  const result = await getTicketsForUserAction(userId, params.orgId)
  if (!result.isSuccess) {
    if (result.message === "No roles found for this organization") {
      redirect("/dashboard/orgs/create")
    }
    return <div data-oid="oj5shl_">Error: {result.message}</div>
  }
  return (
    <div className="container mx-auto space-y-8 py-6" data-oid="s3svcvi">
      <div className="flex items-center justify-between" data-oid="lj56r6b">
        <div data-oid="wf5o6o2">
          <h1 className="text-2xl font-bold" data-oid="4r_rpvo">
            Tickets
          </h1>
          <p className="text-muted-foreground" data-oid="xjzx-7w">
            View and manage maintenance tickets
          </p>
        </div>

        <Button asChild data-oid="16:.qup">
          <Link
            href={`/dashboard/orgs/${params.orgId}/tickets/new`}
            data-oid="5e9kprb"
          >
            New Ticket
          </Link>
        </Button>
      </div>

      <TicketList
        tickets={result.data}
        baseUrl="/staff/tickets"
        data-oid="1ygd2re"
      />
    </div>
  )
}
