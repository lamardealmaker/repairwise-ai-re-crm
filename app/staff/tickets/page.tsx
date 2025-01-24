"use server"

import { getTicketsForUserAction } from "@/actions/db/tickets-actions"
import { auth } from "@clerk/nextjs/server"
import { TicketList } from "@/components/tickets/ticket-list"
import { redirect } from "next/navigation"

interface Props {
  params: { orgId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function StaffTicketsPage({
  params,
  searchParams
}: Props) {
  const { userId } = await auth()

  if (!userId) {
    return <div>Please sign in to view tickets.</div>
  }

  const status = searchParams.status as string | undefined
  const priority = searchParams.priority as string | undefined

  const result = await getTicketsForUserAction(userId, params.orgId, {
    status: (status as any) || "all",
    priority: (priority as any) || "all"
  })

  if (!result.isSuccess) {
    if (result.message === "No roles found for this organization") {
      redirect("/dashboard/orgs/create")
    }
    return <div>Error: {result.message}</div>
  }

  return (
    <div className="container space-y-6 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Maintenance Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <select
          className="rounded-md border p-2"
          value={status || "all"}
          onChange={e => {
            const url = new URL(window.location.href)
            url.searchParams.set("status", e.target.value)
            window.location.href = url.toString()
          }}
        >
          <option value="all">All Statuses</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="closed">Closed</option>
          <option value="completed_by_chat">Completed by Chat</option>
        </select>

        <select
          className="rounded-md border p-2"
          value={priority || "all"}
          onChange={e => {
            const url = new URL(window.location.href)
            url.searchParams.set("priority", e.target.value)
            window.location.href = url.toString()
          }}
        >
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      <TicketList tickets={result.data} baseUrl="/staff/tickets" />
    </div>
  )
}
