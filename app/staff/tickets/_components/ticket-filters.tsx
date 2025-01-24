"use client"

interface TicketFiltersProps {
  status?: string
  priority?: string
}

export function TicketFilters({ status, priority }: TicketFiltersProps) {
  return (
    <div className="flex items-center gap-4">
      <select
        className="rounded-md border p-2"
        value={status || "all"}
        onChange={e => {
          const url = new URL(window.location.href)
          url.searchParams.set("status", e.target.value)
          window.location.href = url.toString()
        }}
      >
        <option value="all">All Statuses</option>
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="closed">Closed</option>
        <option value="completed_by_chat">Completed by Chat</option>
      </select>

      <select
        className="rounded-md border p-2"
        value={priority || "all"}
        onChange={e => {
          const url = new URL(window.location.href)
          url.searchParams.set("priority", e.target.value)
          window.location.href = url.toString()
        }}
      >
        <option value="all">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>
    </div>
  )
}
