"use server"

import { getOrganizationAction } from "@/actions/db/organizations-actions"
import { getPropertiesForOrgAction } from "@/actions/db/properties-actions"
import { PropertiesList } from "./_components/properties-list"
import { PropertyForm } from "./_components/property-form"
import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Building, Mail, Ticket } from "lucide-react"

interface PropertiesPageProps {
  params: {
    orgId: string
  }
}

async function PropertiesListFetcher({ orgId }: { orgId: string }) {
  const { data: properties = [] } = await getPropertiesForOrgAction(orgId)
  return <PropertiesList properties={properties} orgId={orgId} />
}

export default async function PropertiesPage({ params }: PropertiesPageProps) {
  const { data: organization } = await getOrganizationAction(params.orgId)

  if (!organization) {
    return <div>Organization not found</div>
  }

  return (
    <div className="container mx-auto space-y-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Properties - {organization.name}
          </h1>
          <p className="text-muted-foreground">
            Manage properties for this organization
          </p>
        </div>

        <div className="flex gap-4">
          <Button asChild variant="outline">
            <Link href={`/dashboard/orgs/${params.orgId}/tickets`}>
              <Ticket className="mr-2 size-4" />
              Tickets
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/dashboard/orgs/${params.orgId}/invite`}>
              <Mail className="mr-2 size-4" />
              Invites
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <PropertyForm orgId={params.orgId} />
        </div>

        <div>
          <Suspense fallback={<div>Loading properties...</div>}>
            <PropertiesListFetcher orgId={params.orgId} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
