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
  return (
    <PropertiesList properties={properties} orgId={orgId} data-oid="h1s033z" />
  )
}
export default async function PropertiesPage({ params }: PropertiesPageProps) {
  const { data: organization } = await getOrganizationAction(params.orgId)
  if (!organization) {
    return <div data-oid="6txwekv">Organization not found</div>
  }
  return (
    <div className="container mx-auto space-y-8 py-6" data-oid="dhl.6fy">
      <div className="flex items-center justify-between" data-oid="sea3s.-">
        <div data-oid="hhppm2i">
          <h1 className="text-2xl font-bold" data-oid="ijzf4o9">
            Properties - {organization.name}
          </h1>
          <p className="text-muted-foreground" data-oid="fwrscl1">
            Manage properties for this organization
          </p>
        </div>

        <div className="flex gap-4" data-oid="l8n.3vk">
          <Button asChild variant="outline" data-oid="-bg:g3l">
            <Link
              href={`/dashboard/orgs/${params.orgId}/tickets`}
              data-oid="vz4:lzs"
            >
              <Ticket className="mr-2 size-4" data-oid="uiloqso" />
              Tickets
            </Link>
          </Button>
          <Button asChild variant="outline" data-oid=".vyfe6b">
            <Link
              href={`/dashboard/orgs/${params.orgId}/invite`}
              data-oid=".4rxqzf"
            >
              <Mail className="mr-2 size-4" data-oid="t:xl4tx" />
              Invites
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2" data-oid="p4h7:ij">
        <div data-oid="cx8x6p5">
          <PropertyForm orgId={params.orgId} data-oid="wi1zs1z" />
        </div>

        <div data-oid="f_mx:_j">
          <Suspense
            fallback={<div data-oid="ji6:4kw">Loading properties...</div>}
            data-oid="tz2j1y5"
          >
            <PropertiesListFetcher orgId={params.orgId} data-oid="lwe6kdi" />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
