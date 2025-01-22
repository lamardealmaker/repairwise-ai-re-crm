"use server"

import { getTicketsByTenantAction } from "@/actions/db/tickets-actions"
import { TicketList } from "@/components/tickets/ticket-list"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { auth } from "@clerk/nextjs/server"

export default async function StaffTicketsPage() {
  const { userId } = await auth()

  if (!userId) {
    return <div>Please sign in to view tickets.</div>
  }

  // For now, we'll show all tickets. In a real app, you might want to paginate or filter
  const result = await getTicketsByTenantAction(userId)

  return (
    <div className="container space-y-6 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Maintenance Request Dashboard</h1>
        <div className="flex items-center gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Requests</SelectItem>
              <SelectItem value="open">New Requests</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="completed_by_chat">AI Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="low">Routine</SelectItem>
              <SelectItem value="medium">Important</SelectItem>
              <SelectItem value="high">Urgent</SelectItem>
              <SelectItem value="critical">Emergency</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <TicketList
        tickets={result.isSuccess ? result.data : []}
        baseUrl="/staff/tickets"
      />
    </div>
  )
}
