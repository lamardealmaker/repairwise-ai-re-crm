"use client"

import { Button } from "@/components/ui/button"
import { LayoutGrid, LayoutList, Trello } from "lucide-react"

interface ViewToggleProps {
  view: "list" | "grid" | "kanban"
  onChange: (view: "list" | "grid" | "kanban") => void
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant={view === "list" ? "default" : "ghost"}
        size="icon"
        onClick={() => onChange("list")}
      >
        <LayoutList className="size-4" />
      </Button>
      <Button
        variant={view === "grid" ? "default" : "ghost"}
        size="icon"
        onClick={() => onChange("grid")}
      >
        <LayoutGrid className="size-4" />
      </Button>
      <Button
        variant={view === "kanban" ? "default" : "ghost"}
        size="icon"
        onClick={() => onChange("kanban")}
      >
        <Trello className="size-4" />
      </Button>
    </div>
  )
}
