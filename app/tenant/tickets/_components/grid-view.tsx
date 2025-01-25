"use client"

import { Badge } from "@/components/ui/badge"
import { SelectTicket } from "@/db/schema"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
interface GridViewProps {
  tickets: SelectTicket[]
  baseUrl: string
}
export function GridView({ tickets, baseUrl }: GridViewProps) {
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
  if (!tickets?.length) {
    return (
      <div className="rounded-lg border p-8 text-center" data-oid="_1y2kam">
        <p className="text-muted-foreground" data-oid=".x4ytq8">
          No tickets found
        </p>
      </div>
    )
  }
  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      data-oid=":owpw1j"
    >
      {tickets.map(ticket => (
        <Link
          key={ticket.id}
          href={`${baseUrl}/${ticket.id}`}
          className="hover:bg-muted/50 group rounded-lg border p-4 transition-colors"
          data-oid="ptn_a5:"
        >
          <div className="space-y-2" data-oid="fe3mr-i">
            <div
              className="line-clamp-1 font-medium group-hover:text-blue-500"
              data-oid="l6m0w7i"
            >
              {ticket.title}
            </div>
            <div className="flex items-center gap-2" data-oid="thpz:_2">
              <Badge
                className={`${getPriorityColor(ticket.priority)} capitalize text-white`}
                data-oid="_eaar7m"
              >
                {ticket.priority}
              </Badge>
              <Badge
                className={`${getStatusColor(ticket.status)} capitalize text-white`}
                data-oid="_a_9:vn"
              >
                {ticket.status.replace(/_/g, " ")}
              </Badge>
            </div>
            <div
              className="text-muted-foreground flex items-center justify-between text-sm"
              data-oid="j9r_qs2"
            >
              <span className="capitalize" data-oid="-5bsi.9">
                {ticket.category.replace(/_/g, " ")}
              </span>
              <span data-oid="6a524gc">
                {formatDistanceToNow(new Date(ticket.createdAt), {
                  addSuffix: true
                })}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
