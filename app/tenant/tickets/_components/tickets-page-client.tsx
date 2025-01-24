"use client"

import { NewTicketButton } from "./button-wrapper"
import { ViewToggle } from "./view-toggle"
import { TicketFilters } from "./ticket-filters"
import { GridView } from "./grid-view"
import { KanbanView } from "./kanban-view"
import { TicketList } from "@/components/tickets/ticket-list"
import { useState } from "react"
import { SelectTicket } from "@/db/schema"

interface TicketsPageClientProps {
  initialTickets: SelectTicket[]
  baseUrl: string
}

export default function TicketsPageClient({
  initialTickets,
  baseUrl
}: TicketsPageClientProps) {
  const [view, setView] = useState<"list" | "grid" | "kanban">("list")
  const [status, setStatus] = useState("all")
  const [priority, setPriority] = useState("all")

  const filteredTickets = initialTickets.filter(ticket => {
    if (status !== "all" && ticket.status !== status) return false
    if (priority !== "all" && ticket.priority !== priority) return false
    return true
  })

  return (
    <div className="container space-y-6 py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">My Tickets</h1>
        <div className="flex items-center gap-4">
          <TicketFilters
            status={status}
            priority={priority}
            onStatusChange={setStatus}
            onPriorityChange={setPriority}
          />
          <ViewToggle view={view} onChange={setView} />
          <NewTicketButton />
        </div>
      </div>

      <div className="min-h-[300px]">
        {view === "list" && (
          <TicketList tickets={filteredTickets} baseUrl={baseUrl} />
        )}
        {view === "grid" && (
          <GridView tickets={filteredTickets} baseUrl={baseUrl} />
        )}
        {view === "kanban" && (
          <KanbanView tickets={filteredTickets} baseUrl={baseUrl} />
        )}
      </div>
    </div>
  )
}
