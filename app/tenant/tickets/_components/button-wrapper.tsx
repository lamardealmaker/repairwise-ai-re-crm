"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
export function NewTicketButton() {
  return (
    <Button asChild data-oid="a798u51">
      <Link href="/tenant/tickets/new" data-oid="fqyx3n0">
        New Ticket
      </Link>
    </Button>
  )
}
