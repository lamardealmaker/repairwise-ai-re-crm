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
    <div className="container space-y-6 py-8" data-oid="jaj3vvp">
      <div
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        data-oid="hji0yw8"
      >
        <h1 className="text-3xl font-bold" data-oid=":t5.:4q">
          My Tickets
        </h1>
        <div className="flex items-center gap-4" data-oid="uadlm-p">
          <TicketFilters
            status={status}
            priority={priority}
            onStatusChange={setStatus}
            onPriorityChange={setPriority}
            data-oid="du2ws.s"
          />
          <ViewToggle view={view} onChange={setView} data-oid="k2ky_0z" />
          <NewTicketButton data-oid="4m4:gf5" />
        </div>
      </div>

      <div className="min-h-[300px]" data-oid="o:6zva:">
        {view === "list" && (
          <TicketList
            tickets={filteredTickets}
            baseUrl={baseUrl}
            data-oid="tz:9av5"
          />
        )}
        {view === "grid" && (
          <GridView
            tickets={filteredTickets}
            baseUrl={baseUrl}
            data-oid="66ryezk"
          />
        )}
        {view === "kanban" && (
          <KanbanView
            tickets={filteredTickets}
            baseUrl={baseUrl}
            data-oid="9863677"
          />
        )}
      </div>
    </div>
  )
}
