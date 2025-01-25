export const dynamic = "force-dynamic"
import { redirect } from "next/navigation"
import { hasOrganizationsAction } from "@/actions/db/organizations-actions"
import { OrganizationForm } from "@/app/dashboard/orgs/create/_components/organization-form"
export default async function CreateOrganizationPage() {
  // If user has organizations and this isn't a direct navigation, redirect to dashboard
  const { data: hasOrganizations } = await hasOrganizationsAction()
  return (
    <div className="container mx-auto space-y-8 py-6" data-oid="fu-q--h">
      <div data-oid="-64wmdf">
        <h1 className="text-2xl font-bold" data-oid="d2zgeqc">
          Create Organization
        </h1>
        <p className="text-muted-foreground" data-oid="rp:5oyx">
          Create your organization to get started
        </p>
      </div>

      <div className="max-w-md" data-oid="8p7tfw4">
        <OrganizationForm data-oid="mw639x0" />
      </div>
    </div>
  )
}
