"use client"

import { TicketList } from "@/components/tickets/ticket-list"
import { SelectTicket } from "@/db/schema"

interface TicketListWrapperProps {
  tickets: SelectTicket[]
}

export function TicketListWrapper({ tickets }: TicketListWrapperProps) {
  return <TicketList tickets={tickets} baseUrl="/tenant/tickets" />
}
