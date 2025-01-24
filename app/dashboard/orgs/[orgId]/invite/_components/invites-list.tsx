"use client"

import { cancelInviteAction } from "@/actions/db/invites-actions"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Invite } from "@/types"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

interface InvitesListProps {
  invites: Invite[]
  orgId: string
}

export function InvitesList({ invites, orgId }: InvitesListProps) {
  const router = useRouter()
  const [cancelingId, setCancelingId] = useState<string | null>(null)

  async function onCancel(id: string) {
    try {
      setCancelingId(id)

      const result = await cancelInviteAction(id)

      if (!result.isSuccess) {
        toast.error(result.message)
        return
      }

      toast.success(result.message)
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setCancelingId(null)
    }
  }

  if (!invites?.length) {
    return (
      <div className="rounded-lg border p-4 text-center">
        <p className="text-muted-foreground">No pending invites</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invites.map(invite => (
            <TableRow key={invite.id}>
              <TableCell>{invite.email}</TableCell>
              <TableCell>{invite.role}</TableCell>
              <TableCell>{invite.status}</TableCell>
              <TableCell>
                {invite.status === "PENDING" && (
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={cancelingId === invite.id}
                    onClick={() => onCancel(invite.id)}
                  >
                    {cancelingId === invite.id ? "Canceling..." : "Cancel"}
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
