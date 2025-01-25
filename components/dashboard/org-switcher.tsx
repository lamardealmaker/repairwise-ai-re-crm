"use client"

import { getUserOrganizationsAction } from "@/actions/db/organizations-actions"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Organization } from "@/types"
import { Building, ChevronDown, Plus } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
export function OrgSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [selectedOrg, setSelectedOrg] = useState<Organization>()
  const [isLoading, setIsLoading] = useState(true)

  // Extract orgId from pathname
  const orgIdMatch = pathname.match(/\/orgs\/([^\/]+)/)
  const currentOrgId = orgIdMatch ? orgIdMatch[1] : null

  // Load organizations only once on mount
  useEffect(() => {
    async function loadOrganizations() {
      try {
        const { data } = await getUserOrganizationsAction()
        if (data) {
          setOrganizations(data)

          // Only set selected org if we don't have one and have a current org ID
          if (!selectedOrg && currentOrgId) {
            const currentOrg = data.find(org => org.id === currentOrgId)
            if (currentOrg) {
              setSelectedOrg(currentOrg)
            }
          }
        }
      } catch (error) {
        console.error("Error loading organizations:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadOrganizations()
  }, []) // Empty dependency array - only run once on mount

  function onOrgSelect(org: Organization) {
    if (org.id !== selectedOrg?.id) {
      setSelectedOrg(org)
      router.push(`/dashboard/orgs/${org.id}`)
    }
  }
  function onCreateOrg() {
    router.push("/dashboard/orgs/create")
  }
  if (isLoading) {
    return (
      <Button variant="outline" disabled data-oid="-2seu_2">
        <Building className="mr-2 size-4" data-oid="g6yn:9r" />
        Loading...
        <ChevronDown className="ml-2 size-4" data-oid="iph_3v2" />
      </Button>
    )
  }
  if (organizations.length === 0) {
    return (
      <Button variant="outline" onClick={onCreateOrg} data-oid="jp7d00_">
        <Plus className="mr-2 size-4" data-oid="0xz:6iu" />
        Create Organization
      </Button>
    )
  }
  return (
    <DropdownMenu data-oid="2a71uu_">
      <DropdownMenuTrigger asChild data-oid="mjv:5zy">
        <Button
          variant="outline"
          className="w-52 justify-start"
          data-oid="0babb9e"
        >
          <Building className="mr-2 size-4" data-oid="4e4mmyr" />
          {selectedOrg?.name || "Select Organization"}
          <ChevronDown className="ml-auto size-4" data-oid="b18nw3w" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52" data-oid="hcqd:ph">
        <DropdownMenuLabel data-oid="yr0v8ry">Organizations</DropdownMenuLabel>
        <DropdownMenuSeparator data-oid="hnnz8j7" />
        {organizations.map(org => (
          <DropdownMenuItem
            key={org.id}
            onClick={() => onOrgSelect(org)}
            className="cursor-pointer"
            data-oid="xykzokl"
          >
            {org.name}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator data-oid="n6z10_d" />
        <DropdownMenuItem
          onClick={onCreateOrg}
          className="cursor-pointer"
          data-oid="41z9jc1"
        >
          <Plus className="mr-2 size-4" data-oid="c1bk7r3" />
          Create Organization
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
