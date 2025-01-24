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
    <div className="container space-y-8 py-8">
      <div>
        <div className="mb-1 flex items-center gap-2">
          <Link
            href={`/tenant/tickets`}
            className="text-muted-foreground text-sm hover:underline"
          >
            ← Back to maintenance requests
          </Link>
        </div>
        <h1 className="text-3xl font-bold">{ticket.title}</h1>
        <div className="mt-2 flex items-center gap-2">
          <Badge className={`${getPriorityColor(ticket.priority)} text-white`}>
            {ticket.priority}
          </Badge>
          <Badge className={`${getStatusColor(ticket.status)} text-white`}>
            {ticket.status.replace(/_/g, " ")}
          </Badge>
          <span className="text-muted-foreground text-sm">
            Opened{" "}
            {formatDistanceToNow(new Date(ticket.createdAt), {
              addSuffix: true
            })}
          </span>
        </div>
      </div>

      <ProgressIndicator ticket={ticket} />

      <div className="space-y-4">
        <div className="prose max-w-none">
          <p>{ticket.description}</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Communication History</h2>
          </div>

          <TicketMessageThread
            ticketId={ticket.id}
            messages={messages}
            currentUserId={currentUserId}
          />
        </div>
      </div>
    </div>
  )
}
