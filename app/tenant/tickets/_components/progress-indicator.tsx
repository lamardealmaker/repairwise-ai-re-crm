"use client"

import { SelectTicket } from "@/db/schema"

interface ProgressIndicatorProps {
  ticket: SelectTicket
}

const STATUSES = ["open", "in_progress", "completed", "closed"] as const

export function ProgressIndicator({ ticket }: ProgressIndicatorProps) {
  const currentIndex = STATUSES.indexOf(
    ticket.status as (typeof STATUSES)[number]
  )

  return (
    <div className="space-y-2">
      <div className="flex">
        {STATUSES.map((status, index) => (
          <div
            key={status}
            className="flex-1"
            style={{
              paddingRight: index === STATUSES.length - 1 ? 0 : "4px"
            }}
          >
            <div
              className={`h-2 rounded-full ${
                index <= currentIndex
                  ? getStatusColor(status)
                  : "bg-muted hover:bg-muted/80"
              }`}
            />
          </div>
        ))}
      </div>
      <div className="text-muted-foreground flex justify-between text-xs">
        {STATUSES.map((status, index) => (
          <div
            key={status}
            className={`capitalize ${
              index === currentIndex ? "text-foreground font-medium" : ""
            }`}
          >
            {status.replace(/_/g, " ")}
          </div>
        ))}
      </div>
    </div>
  )
}

function getStatusColor(status: string) {
  switch (status) {
    case "open":
      return "bg-blue-500"
    case "in_progress":
      return "bg-yellow-500"
    case "completed":
      return "bg-green-500"
    case "closed":
      return "bg-gray-500"
    default:
      return "bg-gray-500"
  }
}
