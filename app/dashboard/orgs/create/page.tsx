"use server"

import { redirect } from "next/navigation"
import { hasOrganizationsAction } from "@/actions/db/organizations-actions"
import { OrganizationForm } from "@/app/dashboard/orgs/create/_components/organization-form"

export default async function CreateOrganizationPage() {
  // If user has organizations and this isn't a direct navigation, redirect to dashboard
  const { data: hasOrganizations } = await hasOrganizationsAction()

  return (
    <div className="container mx-auto space-y-8 py-6">
      <div>
        <h1 className="text-2xl font-bold">Create Organization</h1>
        <p className="text-muted-foreground">
          Create your organization to get started
        </p>
      </div>

      <div className="max-w-md">
        <OrganizationForm />
      </div>
    </div>
  )
}
