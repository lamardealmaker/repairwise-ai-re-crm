"use client"

import { TicketForm } from "@/components/tickets/ticket-form"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function NewTicketPage() {
  const { userId, isLoaded } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/login")
    }
  }, [isLoaded, userId, router])

  if (!isLoaded || !userId) {
    return null
  }

  return (
    <div className="container max-w-2xl space-y-6 py-8">
      <div>
        <h1 className="text-3xl font-bold">Submit Maintenance Request</h1>
        <p className="text-muted-foreground">
          Tell us about the issue and our AI will help prioritize and route your
          request
        </p>
      </div>

      <TicketForm
        tenantId={userId}
        onSuccess={() => {
          router.push("/tenant/tickets")
        }}
      />
    </div>
  )
}
