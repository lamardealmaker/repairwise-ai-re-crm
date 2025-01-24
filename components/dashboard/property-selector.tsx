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
      <Button variant="outline" disabled>
        <Building className="mr-2 size-4" />
        Loading...
        <ChevronDown className="ml-2 size-4" />
      </Button>
    )
  }

  if (properties.length === 0) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-52 justify-start">
          <Building className="mr-2 size-4" />
          {selectedProperty?.property?.name || "All Properties"}
          <ChevronDown className="ml-auto size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuLabel>Properties</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onViewAll} className="cursor-pointer">
          All Properties
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {properties.map(property => (
          <DropdownMenuItem
            key={property.propertyId}
            onClick={() => onPropertySelect(property)}
            className="cursor-pointer"
          >
            {property.property?.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
