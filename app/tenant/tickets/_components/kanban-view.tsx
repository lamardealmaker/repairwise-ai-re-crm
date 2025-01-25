"use client"

import { Badge } from "@/components/ui/badge"
import { SelectTicket } from "@/db/schema"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
interface KanbanViewProps {
  tickets: SelectTicket[]
  baseUrl: string
}
const STATUSES = ["open", "in_progress", "completed", "closed"] as const
export function KanbanView({ tickets, baseUrl }: KanbanViewProps) {
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
  const ticketsByStatus = STATUSES.reduce(
    (acc, status) => {
      acc[status] = tickets.filter(ticket => ticket.status === status)
      return acc
    },
    {} as Record<(typeof STATUSES)[number], SelectTicket[]>
  )
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4" data-oid="zfz9lan">
      {STATUSES.map(status => (
        <div key={status} className="space-y-4" data-oid="19ym3dz">
          <div className="flex items-center justify-between" data-oid="54s7_0c">
            <h3 className="font-semibold capitalize" data-oid="tfyqwx6">
              {status.replace(/_/g, " ")}
            </h3>
            <Badge
              className={`${getStatusColor(status)} text-white`}
              data-oid="k7_pfcy"
            >
              {ticketsByStatus[status].length}
            </Badge>
          </div>
          <div className="space-y-4" data-oid="zimlikw">
            {ticketsByStatus[status].map(ticket => (
              <Link
                key={ticket.id}
                href={`${baseUrl}/${ticket.id}`}
                className="hover:bg-muted/50 group block rounded-lg border p-4 transition-colors"
                data-oid="xvhz233"
              >
                <div className="space-y-2" data-oid="zrfq6s1">
                  <div
                    className="line-clamp-1 font-medium group-hover:text-blue-500"
                    data-oid="1fwef98"
                  >
                    {ticket.title}
                  </div>
                  <div className="flex items-center gap-2" data-oid="x2pf_07">
                    <Badge
                      className={`${getPriorityColor(ticket.priority)} capitalize text-white`}
                      data-oid="x0ekwip"
                    >
                      {ticket.priority}
                    </Badge>
                  </div>
                  <div
                    className="text-muted-foreground flex items-center justify-between text-sm"
                    data-oid="5z3--6i"
                  >
                    <span className="capitalize" data-oid="3kq8nz1">
                      {ticket.category.replace(/_/g, " ")}
                    </span>
                    <span data-oid="ux.wub4">
                      {formatDistanceToNow(new Date(ticket.createdAt), {
                        addSuffix: true
                      })}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
            {ticketsByStatus[status].length === 0 && (
              <div
                className="rounded-lg border border-dashed p-4 text-center"
                data-oid="s0z_:nx"
              >
                <p className="text-muted-foreground text-sm" data-oid="00pvu7e">
                  No tickets
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
