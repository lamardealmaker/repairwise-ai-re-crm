"use server"

import { getTicketsForUserAction } from "@/actions/db/tickets-actions"
import { getUserOrgIdAction } from "@/actions/db/user-roles-actions"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import TicketsPageClient from "./_components/tickets-page-client"
export default async function TicketsPage() {
  const { userId } = await auth()
  if (!userId) {
    return <div data-oid="wwqn92p">Please sign in to view tickets.</div>
  }

  // Get the organization ID for the tenant
  const orgResult = await getUserOrgIdAction(userId)
  if (!orgResult.isSuccess || !orgResult.data) {
    redirect("/dashboard/orgs/create")
  }
  const orgId = orgResult.data
  const result = await getTicketsForUserAction(userId, orgId)
  if (!result.isSuccess) {
    if (result.message === "No roles found for this organization") {
      redirect("/dashboard/orgs/create")
    }
    return <div data-oid="-ufz4zn">Error: {result.message}</div>
  }
  return (
    <TicketsPageClient
      initialTickets={result.data}
      baseUrl="/tenant/tickets"
      data-oid=".z8m9ln"
    />
  )
}
