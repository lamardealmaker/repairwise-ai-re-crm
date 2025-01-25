"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
interface TicketFiltersProps {
  status: string
  priority: string
  onStatusChange: (value: string) => void
  onPriorityChange: (value: string) => void
}
const STATUSES = ["all", "open", "in_progress", "completed", "closed"] as const
const PRIORITIES = ["all", "low", "medium", "high", "critical"] as const
export function TicketFilters({
  status,
  priority,
  onStatusChange,
  onPriorityChange
}: TicketFiltersProps) {
  return (
    <div className="flex items-center gap-4" data-oid="f1p0bhc">
      <Select value={status} onValueChange={onStatusChange} data-oid="e1v7it0">
        <SelectTrigger className="w-[180px]" data-oid="4v8fsz6">
          <SelectValue placeholder="Filter by status" data-oid=".j5ng-d" />
        </SelectTrigger>
        <SelectContent data-oid="5004n65">
          {STATUSES.map(s => (
            <SelectItem
              key={s}
              value={s}
              className="capitalize"
              data-oid="aa_gvgo"
            >
              {s === "all" ? "All Statuses" : s.replace(/_/g, " ")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={priority}
        onValueChange={onPriorityChange}
        data-oid="tt.xppc"
      >
        <SelectTrigger className="w-[180px]" data-oid="d4k.460">
          <SelectValue placeholder="Filter by priority" data-oid="n1i38ey" />
        </SelectTrigger>
        <SelectContent data-oid="qxl.m5u">
          {PRIORITIES.map(p => (
            <SelectItem
              key={p}
              value={p}
              className="capitalize"
              data-oid="-6_arre"
            >
              {p === "all" ? "All Priorities" : p}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
