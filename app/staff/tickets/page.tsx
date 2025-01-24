"use server"

import { getTicketsForUserAction } from "@/actions/db/tickets-actions"
import { getUserOrgIdAction } from "@/actions/db/user-roles-actions"
import { auth } from "@clerk/nextjs/server"
import { TicketList } from "@/components/tickets/ticket-list"
import { redirect } from "next/navigation"
import { TicketFilters } from "./_components/ticket-filters"

interface Props {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function StaffTicketsPage({ searchParams }: Props) {
  const { userId } = await auth()

  if (!userId) {
    return <div>Please sign in to view tickets.</div>
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
    return <div>Error: {result.message}</div>
  }

  // Redirect to the organization's tickets page
  redirect(`/dashboard/orgs/${orgId}/tickets`)
}
