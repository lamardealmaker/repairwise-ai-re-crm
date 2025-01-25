"use server"

import { getTicketByIdAction } from "@/actions/db/tickets-actions"
import { getTicketMessagesAction } from "@/actions/db/ticket-messages-actions"
import { TicketMessageThread } from "@/components/tickets/ticket-message-thread"
import { TicketStatusUpdate } from "@/components/tickets/ticket-status-update"
import { Badge } from "@/components/ui/badge"
import { auth } from "@clerk/nextjs/server"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { notFound } from "next/navigation"
interface Props {
  params: {
    ticketId: string
  }
}
export default async function StaffTicketPage({ params }: Props) {
  const { userId } = await auth()
  if (!userId) {
    return <div data-oid="gc.ta4e">Please sign in to view this ticket.</div>
  }

  // Get ticket with role-based access check
  const ticketResult = await getTicketByIdAction(params.ticketId)
  const messagesResult = await getTicketMessagesAction(params.ticketId)
  if (!ticketResult.isSuccess || !ticketResult.data) {
    notFound()
  }
  const ticket = ticketResult.data
  function getPriorityColor(priority: string) {
    switch (priority) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      default:
        return "bg-green-500"
    }
  }
  function getStatusColor(status: string) {
    switch (status) {
      case "open":
        return "bg-blue-500"
      case "in_progress":
        return "bg-yellow-500"
      case "completed":
        return "bg-green-500"
      case "completed_by_chat":
        return "bg-purple-500"
      case "closed":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }
  return (
    <div className="container space-y-8 py-8" data-oid="grkwj_5">
      <div className="flex items-start justify-between" data-oid="v-k1-dx">
        <div data-oid="lcv3j2.">
          <div className="mb-1 flex items-center gap-2" data-oid="rjdn.um">
            <Link
              href="/staff/tickets"
              className="text-muted-foreground text-sm hover:underline"
              data-oid="w.6h_zl"
            >
              ← Back to maintenance dashboard
            </Link>
          </div>
          <h1 className="text-3xl font-bold" data-oid="hu.lvna">
            {ticket.title}
          </h1>
          <div className="mt-2 flex items-center gap-2" data-oid="c4g2k6c">
            <Badge
              className={`${getPriorityColor(ticket.priority)} text-white`}
              data-oid="kqr0zsx"
            >
              {ticket.priority}
            </Badge>
            <Badge
              className={`${getStatusColor(ticket.status)} text-white`}
              data-oid="vu7-gw9"
            >
              {ticket.status.replace(/_/g, " ")}
            </Badge>
            <span className="text-muted-foreground text-sm" data-oid="m7wst_h">
              Opened{" "}
              {formatDistanceToNow(new Date(ticket.createdAt), {
                addSuffix: true
              })}
            </span>
          </div>
        </div>

        <TicketStatusUpdate ticket={ticket} data-oid="3.c:tny" />
      </div>

      <div className="space-y-4" data-oid=":v-mc_t">
        <div className="rounded-lg border p-4" data-oid="h7lkmq6">
          <h2 className="mb-2 font-semibold" data-oid=":ir3d4n">
            Description
          </h2>
          <p className="whitespace-pre-wrap" data-oid="4rnvtr1">
            {ticket.description}
          </p>
        </div>

        <TicketMessageThread
          ticketId={ticket.id}
          messages={messagesResult.isSuccess ? messagesResult.data : []}
          currentUserId={userId}
          data-oid="ry:uv7r"
        />
      </div>
    </div>
  )
}
