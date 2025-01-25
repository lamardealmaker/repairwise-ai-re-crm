"use client"

import { TicketMessageThread } from "@/components/tickets/ticket-message-thread"
import { Badge } from "@/components/ui/badge"
import { SelectTicket, SelectTicketMessage } from "@/db/schema"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { ProgressIndicator } from "./progress-indicator"
import { QuickResponses } from "./quick-responses"
interface TicketDetailClientProps {
  ticket: SelectTicket
  messages: SelectTicketMessage[]
  currentUserId: string
}
export function TicketDetailClient({
  ticket,
  messages,
  currentUserId
}: TicketDetailClientProps) {
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
      case "closed":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }
  return (
    <div className="container space-y-8 py-8" data-oid="czrvb.p">
      <div data-oid="upbou76">
        <div className="mb-1 flex items-center gap-2" data-oid="24uamfc">
          <Link
            href={`/tenant/tickets`}
            className="text-muted-foreground text-sm hover:underline"
            data-oid="_3ss.0e"
          >
            ← Back to maintenance requests
          </Link>
        </div>
        <h1 className="text-3xl font-bold" data-oid="kzmy0sa">
          {ticket.title}
        </h1>
        <div className="mt-2 flex items-center gap-2" data-oid="i0ac-0u">
          <Badge
            className={`${getPriorityColor(ticket.priority)} text-white`}
            data-oid="3gl34bz"
          >
            {ticket.priority}
          </Badge>
          <Badge
            className={`${getStatusColor(ticket.status)} text-white`}
            data-oid="7qft0f7"
          >
            {ticket.status.replace(/_/g, " ")}
          </Badge>
          <span className="text-muted-foreground text-sm" data-oid="mhvg-fh">
            Opened{" "}
            {formatDistanceToNow(new Date(ticket.createdAt), {
              addSuffix: true
            })}
          </span>
        </div>
      </div>

      <ProgressIndicator ticket={ticket} data-oid="4j_g-x3" />

      <div className="space-y-4" data-oid="eksa8hl">
        <div className="prose max-w-none" data-oid=":7nai0_">
          <p data-oid="hj.9_2h">{ticket.description}</p>
        </div>

        <div className="space-y-4" data-oid="ds_-5qc">
          <div className="flex items-center justify-between" data-oid="urohekk">
            <h2 className="text-lg font-semibold" data-oid="m:r7wa6">
              Communication History
            </h2>
          </div>

          <TicketMessageThread
            ticketId={ticket.id}
            messages={messages}
            currentUserId={currentUserId}
            data-oid="cdkx8-q"
          />
        </div>
      </div>
    </div>
  )
}
