"use client"

interface TicketFiltersProps {
  status?: string
  priority?: string
}
export function TicketFilters({ status, priority }: TicketFiltersProps) {
  return (
    <div className="flex items-center gap-4" data-oid="2b9bhi3">
      <select
        className="rounded-md border p-2"
        value={status || "all"}
        onChange={e => {
          const url = new URL(window.location.href)
          url.searchParams.set("status", e.target.value)
          window.location.href = url.toString()
        }}
        data-oid="1hx1qbs"
      >
        <option value="all" data-oid="4zk4w8p">
          All Statuses
        </option>
        <option value="open" data-oid="z7z8t29">
          Open
        </option>
        <option value="in_progress" data-oid=":o1t5-b">
          In Progress
        </option>
        <option value="completed" data-oid="h7y6jgv">
          Completed
        </option>
        <option value="closed" data-oid="as8ppv2">
          Closed
        </option>
        <option value="completed_by_chat" data-oid="y0ems2k">
          Completed by Chat
        </option>
      </select>

      <select
        className="rounded-md border p-2"
        value={priority || "all"}
        onChange={e => {
          const url = new URL(window.location.href)
          url.searchParams.set("priority", e.target.value)
          window.location.href = url.toString()
        }}
        data-oid="pfj2np8"
      >
        <option value="all" data-oid="sy2sb7q">
          All Priorities
        </option>
        <option value="low" data-oid="y628klb">
          Low
        </option>
        <option value="medium" data-oid="ktshtjr">
          Medium
        </option>
        <option value="high" data-oid="o8002sj">
          High
        </option>
        <option value="critical" data-oid="uo_53u6">
          Critical
        </option>
      </select>
    </div>
  )
}
