"use server"

import { getTicketsForUserAction } from "@/actions/db/tickets-actions"
import { getUserOrgIdAction } from "@/actions/db/user-roles-actions"
import { auth } from "@clerk/nextjs/server"
import { TicketList } from "@/components/tickets/ticket-list"
import { redirect } from "next/navigation"
import { TicketFilters } from "./_components/ticket-filters"
interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}
export default async function StaffTicketsPage({ searchParams }: Props) {
  const { userId } = await auth()
  if (!userId) {
    return <div data-oid="_mh3rp8">Please sign in to view tickets.</div>
  }

  // Get the organization ID for the staff member
  const orgResult = await getUserOrgIdAction(userId)
  if (!orgResult.isSuccess || !orgResult.data) {
    redirect("/dashboard/orgs/create")
  }
  const orgId = orgResult.data
  const status = searchParams.status as string | undefined
  const priority = searchParams.priority as string | undefined
  const result = await getTicketsForUserAction(userId, orgId, {
    status: (status as any) || "all",
    priority: (priority as any) || "all"
  })
  if (!result.isSuccess) {
    if (result.message === "No roles found for this organization") {
      redirect(`/dashboard/orgs/${orgId}/tickets`)
    }
    return <div data-oid="d9i6whr">Error: {result.message}</div>
  }
  return (
    <div className="container space-y-8 py-8" data-oid="ekhaxgn">
      <div
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        data-oid="mn3feun"
      >
        <h1 className="text-3xl font-bold" data-oid="d6kejqo">
          Maintenance Dashboard
        </h1>
        <div className="flex items-center gap-4" data-oid="7px6xoq">
          <TicketFilters
            status={status || "all"}
            priority={priority || "all"}
            data-oid="1cf6_ow"
          />
        </div>
      </div>

      <div className="min-h-[300px]" data-oid="vrytl02">
        <TicketList
          tickets={result.data}
          baseUrl="/staff/tickets"
          data-oid="43-1uel"
        />
      </div>
    </div>
  )
}
