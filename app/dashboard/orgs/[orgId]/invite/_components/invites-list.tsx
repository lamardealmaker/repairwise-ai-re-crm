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
      <div className="rounded-lg border p-4 text-center" data-oid="d.lyxdn">
        <p className="text-muted-foreground" data-oid="cq53yo1">
          No pending invites
        </p>
      </div>
    )
  }
  return (
    <div className="rounded-lg border" data-oid="iuuabxz">
      <Table data-oid="9mpt6g2">
        <TableHeader data-oid="re5363a">
          <TableRow data-oid="awpl4_y">
            <TableHead data-oid="epq_po1">Email</TableHead>
            <TableHead data-oid="h:7u2v.">Role</TableHead>
            <TableHead data-oid="m6k6agl">Status</TableHead>
            <TableHead data-oid="u-ik-sq">Invite Link</TableHead>
            <TableHead data-oid="il0eq:9">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody data-oid="ndc16t3">
          {invites.map(invite => {
            const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/invite/${invite.token}`
            return (
              <TableRow key={invite.id} data-oid=".bciuvh">
                <TableCell data-oid="f.y8fpy">{invite.email}</TableCell>
                <TableCell data-oid="a0gtz4k">{invite.role}</TableCell>
                <TableCell data-oid="bguzon6">{invite.status}</TableCell>
                <TableCell data-oid="st-17rl">
                  <div className="flex items-center gap-2" data-oid="2c9aik0">
                    {viewingId === invite.token ? (
                      <div
                        className="flex items-center gap-2"
                        data-oid="u7jh54:"
                      >
                        <span
                          className="text-muted-foreground text-sm"
                          data-oid="stbul_z"
                        >
                          {inviteLink}
                        </span>
                        <button
                          onClick={() => setViewingId(null)}
                          className="text-muted-foreground hover:text-foreground"
                          data-oid="oezvvh0"
                        >
                          <EyeOff className="size-4" data-oid="a-dtyb7" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setViewingId(invite.token)}
                        className="text-muted-foreground hover:text-foreground"
                        data-oid="9n7hta4"
                      >
                        <Eye className="size-4" data-oid="1lm-duk" />
                      </button>
                    )}
                    <button
                      onClick={() => copyToClipboard(invite.token)}
                      className="text-muted-foreground hover:text-foreground"
                      data-oid="ipy1wn:"
                    >
                      <Copy
                        className={`size-4 ${copiedId === invite.token ? "text-green-500" : ""}`}
                        data-oid="x00d_.e"
                      />
                    </button>
                  </div>
                </TableCell>
                <TableCell data-oid="sq364u1">
                  {invite.status === "PENDING" && (
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={cancelingId === invite.id}
                      onClick={() => onCancel(invite.id)}
                      data-oid="44rwjhb"
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
