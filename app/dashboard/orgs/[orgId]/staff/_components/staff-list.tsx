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
      <div className="rounded-lg border p-4 text-center">
        <p className="text-muted-foreground">No staff members found</p>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Property</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staff.map(member => (
              <TableRow key={member.id}>
                <TableCell>{member.user?.fullName || "N/A"}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>
                  {member.property?.name || "All Properties"}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="size-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => onAction(member, "edit")}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => onAction(member, "delete")}
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
        />
      )}
    </>
  )
}
