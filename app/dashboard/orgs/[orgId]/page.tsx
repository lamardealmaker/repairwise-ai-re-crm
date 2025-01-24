"use server"

import { redirect } from "next/navigation"

interface OrgPageProps {
  params: {
    orgId: string
  }
}

export default async function OrgPage({ params }: OrgPageProps) {
  // Redirect to properties page by default
  redirect(`/dashboard/orgs/${params.orgId}/properties`)
}
