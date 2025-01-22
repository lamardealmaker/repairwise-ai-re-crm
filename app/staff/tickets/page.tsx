"use client"

import { getAllTicketsAction } from "@/actions/db/tickets-actions"
import { TicketList } from "@/components/tickets/ticket-list"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { SelectTicket } from "@/db/schema"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function StaffTicketsPage() {
  const { userId, isLoaded } = useAuth()
  const router = useRouter()
  const [tickets, setTickets] = useState<SelectTicket[]>([])
  const [status, setStatus] = useState("all")
  const [priority, setPriority] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/login")
      return
    }

    async function fetchTickets() {
      setIsLoading(true)
      const result = await getAllTicketsAction({
        status: status as any,
        priority: priority as any
      })
      if (result.isSuccess) {
        setTickets(result.data)
      }
      setIsLoading(false)
    }

    if (userId) {
      fetchTickets()
    }
  }, [isLoaded, userId, status, priority])

  if (!isLoaded || !userId) {
    return null
  }

  return (
    <div className="container space-y-6 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Maintenance Request Dashboard</h1>
        <div className="flex items-center gap-4">
          <Select value={status} onValueChange={setStatus}>
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

          <Select value={priority} onValueChange={setPriority}>
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

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <TicketList tickets={tickets} baseUrl="/staff/tickets" />
      )}
    </div>
  )
}
