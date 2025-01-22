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

interface TicketPageProps {
  params: {
    ticketId: string
  }
}

export default async function StaffTicketPage({ params }: TicketPageProps) {
  const { userId } = await auth()

  if (!userId) {
    return <div>Please sign in to view this ticket.</div>
  }

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
    <div className="container space-y-8 py-8">
      <div className="flex items-start justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Link
              href="/staff/tickets"
              className="text-muted-foreground text-sm hover:underline"
            >
              ← Back to maintenance dashboard
            </Link>
          </div>
          <h1 className="text-3xl font-bold">{ticket.title}</h1>
          <div className="mt-2 flex items-center gap-2">
            <Badge
              className={`${getPriorityColor(ticket.priority)} text-white`}
            >
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
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <div className="prose max-w-none">
            <h3>Issue Description</h3>
            <p>{ticket.description}</p>
          </div>

          {ticket.resolutionDetails && (
            <div className="prose max-w-none">
              <h3>Resolution Details</h3>
              <p>{ticket.resolutionDetails}</p>
              {ticket.timeSpent && <p>Time to complete: {ticket.timeSpent}</p>}
              {ticket.costIncurred && <p>Repair cost: {ticket.costIncurred}</p>}
            </div>
          )}

          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Communication History
            </h3>
            <TicketMessageThread
              ticketId={ticket.id}
              messages={messagesResult.isSuccess ? messagesResult.data : []}
              currentUserId={userId}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-muted space-y-4 rounded-lg p-4">
            <h3 className="font-semibold">Maintenance Details</h3>
            <div>
              <div className="text-muted-foreground text-sm">Type of Issue</div>
              <div className="capitalize">
                {ticket.category.replace(/_/g, " ")}
              </div>
            </div>
          </div>

          <div className="bg-muted space-y-4 rounded-lg p-4">
            <h3 className="font-semibold">Update Maintenance Status</h3>
            <TicketStatusUpdate ticket={ticket} />
          </div>
        </div>
      </div>
    </div>
  )
}
