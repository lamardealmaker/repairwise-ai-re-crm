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
import { Copy, Eye, EyeOff } from "lucide-react"

interface InvitesListProps {
  invites: Invite[]
  orgId: string
}

export function InvitesList({ invites, orgId }: InvitesListProps) {
  const router = useRouter()
  const [cancelingId, setCancelingId] = useState<string | null>(null)
  const [viewingId, setViewingId] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

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

  const copyToClipboard = async (token: string) => {
    const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/invite/${token}`
    try {
      await navigator.clipboard.writeText(inviteLink)
      setCopiedId(token)
      toast.success("Invite link copied to clipboard")
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      toast.error("Failed to copy invite link")
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
            <TableHead>Invite Link</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invites.map(invite => {
            const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/invite/${invite.token}`
            return (
              <TableRow key={invite.id}>
                <TableCell>{invite.email}</TableCell>
                <TableCell>{invite.role}</TableCell>
                <TableCell>{invite.status}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {viewingId === invite.token ? (
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-sm">
                          {inviteLink}
                        </span>
                        <button
                          onClick={() => setViewingId(null)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <EyeOff className="size-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setViewingId(invite.token)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Eye className="size-4" />
                      </button>
                    )}
                    <button
                      onClick={() => copyToClipboard(invite.token)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Copy
                        className={`size-4 ${
                          copiedId === invite.token ? "text-green-500" : ""
                        }`}
                      />
                    </button>
                  </div>
                </TableCell>
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
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
