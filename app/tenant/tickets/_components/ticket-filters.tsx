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
    <div className="flex items-center gap-4">
      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          {STATUSES.map(s => (
            <SelectItem key={s} value={s} className="capitalize">
              {s === "all" ? "All Statuses" : s.replace(/_/g, " ")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={priority} onValueChange={onPriorityChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by priority" />
        </SelectTrigger>
        <SelectContent>
          {PRIORITIES.map(p => (
            <SelectItem key={p} value={p} className="capitalize">
              {p === "all" ? "All Priorities" : p}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
