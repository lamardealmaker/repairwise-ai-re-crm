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

// Key for localStorage
const SELECTED_ORG_KEY = "selectedOrganization"

export function OrgSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [selectedOrg, setSelectedOrg] = useState<Organization>()
  const [isLoading, setIsLoading] = useState(true)

  // Load organizations and initialize selected org
  useEffect(() => {
    async function initializeOrganizations() {
      try {
        const { data } = await getUserOrganizationsAction()
        if (!data) return

        setOrganizations(data)

        // Try to get org from localStorage first
        const savedOrg = localStorage.getItem(SELECTED_ORG_KEY)
        if (savedOrg) {
          const parsedOrg = JSON.parse(savedOrg)
          // Verify the saved org still exists in user's orgs
          if (data.find(org => org.id === parsedOrg.id)) {
            setSelectedOrg(parsedOrg)
            return
          }
        }

        // If no saved org or it's invalid, try to get from URL
        const orgIdMatch = pathname.match(/\/orgs\/([^\/]+)/)
        const currentOrgId = orgIdMatch?.[1]
        if (currentOrgId) {
          const currentOrg = data.find(org => org.id === currentOrgId)
          if (currentOrg) {
            setSelectedOrg(currentOrg)
            localStorage.setItem(SELECTED_ORG_KEY, JSON.stringify(currentOrg))
            return
          }
        }

        // If no saved org and no URL org:
        // For single org, use that
        if (data.length === 1) {
          setSelectedOrg(data[0])
          localStorage.setItem(SELECTED_ORG_KEY, JSON.stringify(data[0]))
          return
        }
        // For multiple orgs, use most recent
        if (data.length > 1) {
          const mostRecentOrg = [...data].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )[0]
          setSelectedOrg(mostRecentOrg)
          localStorage.setItem(SELECTED_ORG_KEY, JSON.stringify(mostRecentOrg))
          return
        }
      } catch (error) {
        console.error("Error initializing organizations:", error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeOrganizations()
  }, [pathname]) // Only re-run if pathname changes

  function onOrgSelect(org: Organization) {
    if (org.id === selectedOrg?.id) return

    setSelectedOrg(org)
    localStorage.setItem(SELECTED_ORG_KEY, JSON.stringify(org))
    router.push(`/dashboard/orgs/${org.id}/tickets`)
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
