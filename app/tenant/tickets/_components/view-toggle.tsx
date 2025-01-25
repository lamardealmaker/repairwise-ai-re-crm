"use client"

import { Button } from "@/components/ui/button"
import { LayoutGrid, LayoutList, Trello } from "lucide-react"
interface ViewToggleProps {
  view: "list" | "grid" | "kanban"
  onChange: (view: "list" | "grid" | "kanban") => void
}
export function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2" data-oid="bz2_pb6">
      <Button
        variant={view === "list" ? "default" : "ghost"}
        size="icon"
        onClick={() => onChange("list")}
        data-oid="uk6taeb"
      >
        <LayoutList className="size-4" data-oid="-ffyzbq" />
      </Button>
      <Button
        variant={view === "grid" ? "default" : "ghost"}
        size="icon"
        onClick={() => onChange("grid")}
        data-oid="1gr.ig7"
      >
        <LayoutGrid className="size-4" data-oid="u68d.ji" />
      </Button>
      <Button
        variant={view === "kanban" ? "default" : "ghost"}
        size="icon"
        onClick={() => onChange("kanban")}
        data-oid="wbleow:"
      >
        <Trello className="size-4" data-oid="5a40jdb" />
      </Button>
    </div>
  )
}
