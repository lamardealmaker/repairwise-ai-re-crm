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
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function OrgSwitcher() {
  const router = useRouter()
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [selectedOrg, setSelectedOrg] = useState<Organization>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadOrganizations() {
      try {
        const { data } = await getUserOrganizationsAction()
        if (data) {
          setOrganizations(data)
          // Set the first org as selected if none is selected
          if (!selectedOrg && data.length > 0) {
            setSelectedOrg(data[0])
          }
        }
      } catch (error) {
        console.error("Error loading organizations:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadOrganizations()
  }, [selectedOrg])

  function onOrgSelect(org: Organization) {
    setSelectedOrg(org)
    router.push(`/dashboard/orgs/${org.id}`)
  }

  function onCreateOrg() {
    router.push("/dashboard/orgs/create")
  }

  if (isLoading) {
    return (
      <Button variant="outline" disabled>
        <Building className="mr-2 size-4" />
        Loading...
        <ChevronDown className="ml-2 size-4" />
      </Button>
    )
  }

  if (organizations.length === 0) {
    return (
      <Button variant="outline" onClick={onCreateOrg}>
        <Plus className="mr-2 size-4" />
        Create Organization
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-52 justify-start">
          <Building className="mr-2 size-4" />
          {selectedOrg?.name || "Select Organization"}
          <ChevronDown className="ml-auto size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuLabel>Organizations</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {organizations.map(org => (
          <DropdownMenuItem
            key={org.id}
            onClick={() => onOrgSelect(org)}
            className="cursor-pointer"
          >
            {org.name}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onCreateOrg} className="cursor-pointer">
          <Plus className="mr-2 size-4" />
          Create Organization
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
