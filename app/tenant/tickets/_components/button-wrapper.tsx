"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function NewTicketButton() {
  return (
    <Button asChild>
      <Link href="/tenant/tickets/new">New Ticket</Link>
    </Button>
  )
}
