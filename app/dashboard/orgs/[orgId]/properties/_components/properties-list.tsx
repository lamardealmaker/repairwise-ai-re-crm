"use client"

import { assignUserToAllPropertiesAction } from "@/actions/db/user-roles-actions"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Property } from "@/types"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

interface PropertiesListProps {
  properties: Property[]
  orgId: string
}

export function PropertiesList({ properties, orgId }: PropertiesListProps) {
  const router = useRouter()
  const [isAssigning, setIsAssigning] = useState(false)

  async function onAssignToAll(userId: string) {
    try {
      setIsAssigning(true)

      const result = await assignUserToAllPropertiesAction({
        userId,
        orgId,
        role: "EMPLOYEE"
      })

      if (!result.isSuccess) {
        toast.error(result.message)
        return
      }

      toast.success(result.message)
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsAssigning(false)
    }
  }

  if (!properties?.length) {
    return (
      <div className="rounded-lg border p-4 text-center">
        <p className="text-muted-foreground">No properties found</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map(property => (
            <TableRow key={property.id}>
              <TableCell>{property.name}</TableCell>
              <TableCell>
                {new Date(property.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isAssigning}
                  onClick={() => onAssignToAll(property.id)}
                >
                  {isAssigning ? "Assigning..." : "Assign All Staff"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
