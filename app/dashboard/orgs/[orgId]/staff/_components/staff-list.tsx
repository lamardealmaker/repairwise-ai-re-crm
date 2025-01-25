"use client"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { UserRoleWithDetails } from "@/types"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { MoreHorizontal } from "lucide-react"
import { StaffModal } from "./staff-modal"
interface StaffListProps {
  staff: UserRoleWithDetails[]
}
export function StaffList({ staff }: StaffListProps) {
  const router = useRouter()
  const [selectedStaff, setSelectedStaff] =
    useState<UserRoleWithDetails | null>(null)
  const [modalMode, setModalMode] = useState<"edit" | "delete" | null>(null)
  function onAction(member: UserRoleWithDetails, mode: "edit" | "delete") {
    setSelectedStaff(member)
    setModalMode(mode)
  }
  function onModalClose() {
    setSelectedStaff(null)
    setModalMode(null)
  }
  function onSuccess() {
    router.refresh()
  }
  if (!staff?.length) {
    return (
      <div className="rounded-lg border p-4 text-center" data-oid="la671ho">
        <p className="text-muted-foreground" data-oid="tz_u:gn">
          No staff members found
        </p>
      </div>
    )
  }
  return (
    <>
      <div className="rounded-lg border" data-oid="8j6ca1q">
        <Table data-oid="-mu6lkk">
          <TableHeader data-oid="zdg4lvf">
            <TableRow data-oid="k76a.o-">
              <TableHead data-oid="00kmfmd">Name</TableHead>
              <TableHead data-oid="t5ctk-:">Role</TableHead>
              <TableHead data-oid="p0he32-">Property</TableHead>
              <TableHead className="w-[70px]" data-oid="fryqozu"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody data-oid="v6gclhq">
            {staff.map(member => (
              <TableRow key={member.id} data-oid="jeqd:co">
                <TableCell data-oid="co5z8li">
                  {member.user?.fullName || "N/A"}
                </TableCell>
                <TableCell data-oid="-75_l33">{member.role}</TableCell>
                <TableCell data-oid="pcjjyc4">
                  {member.property?.name || "All Properties"}
                </TableCell>
                <TableCell data-oid="k0-it2l">
                  <DropdownMenu data-oid="fw5_:op">
                    <DropdownMenuTrigger asChild data-oid="4_fep2f">
                      <Button
                        variant="ghost"
                        className="size-8 p-0"
                        data-oid=".5-l0bg"
                      >
                        <span className="sr-only" data-oid="an9dyi7">
                          Open menu
                        </span>
                        <MoreHorizontal className="size-4" data-oid="l5:uf8_" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" data-oid="99cny4e">
                      <DropdownMenuItem
                        onClick={() => onAction(member, "edit")}
                        data-oid="c1gl.o0"
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => onAction(member, "delete")}
                        data-oid="t:vuqwe"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedStaff && modalMode && (
        <StaffModal
          staff={selectedStaff}
          mode={modalMode}
          isOpen={true}
          onClose={onModalClose}
          onSuccess={onSuccess}
          data-oid="q6trt6m"
        />
      )}
    </>
  )
}
