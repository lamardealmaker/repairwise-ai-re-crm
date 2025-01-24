"use server"

import { getTicketByIdAction } from "@/actions/db/tickets-actions"
import { getTicketMessagesAction } from "@/actions/db/ticket-messages-actions"
import { auth } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"
import { TicketDetailClient } from "../_components/ticket-detail-client"

type Props = {
  params: { ticketId: string }
}

export default async function TicketPage({ params }: Props) {
  const { userId } = await auth()

  if (!userId) {
    return <div>Please sign in to view this ticket.</div>
  }

  const [ticketResult, messagesResult] = await Promise.all([
    getTicketByIdAction(params.ticketId),
    getTicketMessagesAction(params.ticketId)
  ])

  if (!ticketResult.isSuccess || !ticketResult.data) {
    notFound()
  }

  return (
    <TicketDetailClient
      ticket={ticketResult.data}
      messages={messagesResult.isSuccess ? messagesResult.data : []}
      currentUserId={userId}
    />
  )
}
