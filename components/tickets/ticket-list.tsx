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
    <Table data-oid="._7uoic">
      <TableHeader data-oid="gl7.0em">
        <TableRow data-oid="vs:8-k:">
          <TableHead data-oid="jnj1mt:">Title</TableHead>
          <TableHead data-oid="t9o-n-2">Category</TableHead>
          <TableHead data-oid="di1lyxy">Priority</TableHead>
          <TableHead data-oid="a_cvp92">Status</TableHead>
          <TableHead data-oid="byt6kxu">Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody data-oid="eicovam">
        {tickets.map(ticket => (
          <TableRow key={ticket.id} data-oid="b11k.2y">
            <TableCell data-oid="bm4dw35">
              <Link
                href={`${baseUrl}/${ticket.id}`}
                className="text-blue-500 hover:underline"
                data-oid="na1fl3m"
              >
                {ticket.title}
              </Link>
            </TableCell>
            <TableCell className="capitalize" data-oid="yibvavg">
              {ticket.category.replace(/_/g, " ")}
            </TableCell>
            <TableCell data-oid="p-ghrva">
              <Badge
                className={`${getPriorityColor(ticket.priority)} capitalize text-white`}
                data-oid="w3xm1rp"
              >
                {ticket.priority}
              </Badge>
            </TableCell>
            <TableCell data-oid="1vxuuj_">
              <Badge
                className={`${getStatusColor(ticket.status)} capitalize text-white`}
                data-oid="orqwcth"
              >
                {ticket.status.replace(/_/g, " ")}
              </Badge>
            </TableCell>
            <TableCell data-oid="2xkt41i">
              {formatDistanceToNow(new Date(ticket.createdAt), {
                addSuffix: true
              })}
            </TableCell>
          </TableRow>
        ))}
        {tickets.length === 0 && (
          <TableRow data-oid="vq86bcf">
            <TableCell
              colSpan={5}
              className="py-8 text-center"
              data-oid="2s_5xr7"
            >
              No tickets found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
