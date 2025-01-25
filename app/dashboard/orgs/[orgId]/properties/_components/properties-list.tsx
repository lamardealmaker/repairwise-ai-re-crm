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
      <div className="rounded-lg border p-4 text-center" data-oid=":k1-dtw">
        <p className="text-muted-foreground" data-oid="6:.3xco">
          No properties found
        </p>
      </div>
    )
  }
  return (
    <div className="rounded-lg border" data-oid="5hxsckf">
      <Table data-oid="xo.y7_q">
        <TableHeader data-oid="2w49utv">
          <TableRow data-oid="8sms.1k">
            <TableHead data-oid="9_ijwds">Name</TableHead>
            <TableHead data-oid="73tk6u1">Created</TableHead>
            <TableHead data-oid="jwt8qfx">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody data-oid="ozp4bno">
          {properties.map(property => (
            <TableRow key={property.id} data-oid="wucdeia">
              <TableCell data-oid="ophb_:n">{property.name}</TableCell>
              <TableCell data-oid="12r8-6z">
                {new Date(property.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell data-oid="e_81743">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isAssigning}
                  onClick={() => onAssignToAll(property.id)}
                  data-oid="foukx0a"
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
