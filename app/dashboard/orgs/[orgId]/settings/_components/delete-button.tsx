"use client"

import { Button } from "@/components/ui/button"

export function DeleteButton() {
  return (
    <Button
      variant="destructive"
      onClick={() => {
        // TODO: Add delete organization functionality
      }}
    >
      Delete Organization
    </Button>
  )
}
