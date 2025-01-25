"use client"

import { getUserRolesAction } from "@/actions/db/user-roles-actions"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { UserRoleWithDetails } from "@/types"
import { Building, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
interface PropertySelectorProps {
  orgId: string
  currentPropertyId?: string | null
}
export function PropertySelector({
  orgId,
  currentPropertyId
}: PropertySelectorProps) {
  const router = useRouter()
  const [properties, setProperties] = useState<UserRoleWithDetails[]>([])
  const [selectedProperty, setSelectedProperty] =
    useState<UserRoleWithDetails>()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    async function loadProperties() {
      try {
        const { data } = await getUserRolesAction(orgId)
        if (data) {
          // Filter out roles without properties and duplicates
          const propertyRoles = data
            .filter(
              role =>
                role.property && ["MAINTENANCE", "EMPLOYEE"].includes(role.role)
            )
            .filter(
              (role, index, self) =>
                index === self.findIndex(r => r.propertyId === role.propertyId)
            )
          setProperties(propertyRoles)

          // Set selected property
          if (currentPropertyId) {
            const current = propertyRoles.find(
              role => role.propertyId === currentPropertyId
            )
            if (current) {
              setSelectedProperty(current)
            }
          } else if (propertyRoles.length > 0) {
            setSelectedProperty(propertyRoles[0])
          }
        }
      } catch (error) {
        console.error("Error loading properties:", error)
        toast.error("Failed to load properties")
      } finally {
        setIsLoading(false)
      }
    }
    loadProperties()
  }, [orgId, currentPropertyId])
  function onPropertySelect(property: UserRoleWithDetails) {
    setSelectedProperty(property)
    router.push(
      `/dashboard/orgs/${orgId}/properties/${property.propertyId}/tickets`
    )
  }
  function onViewAll() {
    setSelectedProperty(undefined)
    router.push(`/dashboard/orgs/${orgId}/tickets`)
  }
  if (isLoading) {
    return (
      <Button variant="outline" disabled data-oid="6iy8nbx">
        <Building className="mr-2 size-4" data-oid="os-k6m." />
        Loading...
        <ChevronDown className="ml-2 size-4" data-oid="i18ptvk" />
      </Button>
    )
  }
  if (properties.length === 0) {
    return null
  }
  return (
    <DropdownMenu data-oid="g688sym">
      <DropdownMenuTrigger asChild data-oid="rmw8flh">
        <Button
          variant="outline"
          className="w-52 justify-start"
          data-oid=":tf6wdo"
        >
          <Building className="mr-2 size-4" data-oid="i4bo1gq" />
          {selectedProperty?.property?.name || "All Properties"}
          <ChevronDown className="ml-auto size-4" data-oid="e7lw.tt" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52" data-oid="ah18yre">
        <DropdownMenuLabel data-oid="4408fgf">Properties</DropdownMenuLabel>
        <DropdownMenuSeparator data-oid="8_a1wxq" />
        <DropdownMenuItem
          onClick={onViewAll}
          className="cursor-pointer"
          data-oid="r2fow2f"
        >
          All Properties
        </DropdownMenuItem>
        <DropdownMenuSeparator data-oid="g3chli:" />
        {properties.map(property => (
          <DropdownMenuItem
            key={property.propertyId}
            onClick={() => onPropertySelect(property)}
            className="cursor-pointer"
            data-oid="y8:sfn_"
          >
            {property.property?.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
