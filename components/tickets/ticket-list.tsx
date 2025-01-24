"use client"

import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { SelectTicket } from "@/db/schema"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

interface TicketListProps {
  tickets: SelectTicket[]
  baseUrl: string // e.g., "/tenant/tickets" or "/staff/tickets"
}

export function TicketList({ tickets, baseUrl }: TicketListProps) {
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
        return "bg-blue-500/80"
      case "in_progress":
        return "bg-yellow-500/80"
      case "completed":
        return "bg-emerald-500/80"
      case "completed_by_chat":
        return "bg-secondary"
      case "closed":
        return "bg-gray-400/80"
      default:
        return "bg-gray-400/80"
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets.map(ticket => (
          <TableRow key={ticket.id}>
            <TableCell>
              <Link
                href={`${baseUrl}/${ticket.id}`}
                className="text-blue-500 hover:underline"
              >
                {ticket.title}
              </Link>
            </TableCell>
            <TableCell className="capitalize">
              {ticket.category.replace(/_/g, " ")}
            </TableCell>
            <TableCell>
              <Badge
                className={`${getPriorityColor(
                  ticket.priority
                )} capitalize text-white`}
              >
                {ticket.priority}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge
                className={`${getStatusColor(ticket.status)} capitalize text-white`}
              >
                {ticket.status.replace(/_/g, " ")}
              </Badge>
            </TableCell>
            <TableCell>
              {formatDistanceToNow(new Date(ticket.createdAt), {
                addSuffix: true
              })}
            </TableCell>
          </TableRow>
        ))}
        {tickets.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="py-8 text-center">
              No tickets found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
