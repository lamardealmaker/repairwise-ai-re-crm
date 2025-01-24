"use client"

import { updateTicketAction } from "@/actions/db/tickets-actions"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { InsertTicket, SelectTicket } from "@/db/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useState } from "react"
import { z } from "zod"

const statusUpdateSchema = z.object({
  status: z.enum([
    "open",
    "in_progress",
    "completed",
    "completed_by_chat",
    "closed"
  ]),
  resolutionDetails: z
    .string()
    .min(10, "Resolution details must be at least 10 characters")
    .max(1000, "Resolution details must not exceed 1000 characters")
    .optional()
    .nullable(),
  timeSpent: z
    .string()
    .max(50, "Time spent must not exceed 50 characters")
    .optional()
    .nullable(),
  costIncurred: z
    .string()
    .max(50, "Cost incurred must not exceed 50 characters")
    .optional()
    .nullable()
})

type StatusUpdateValues = z.infer<typeof statusUpdateSchema>

interface TicketStatusUpdateProps {
  ticket: SelectTicket
  onSuccess?: () => void
}

export function TicketStatusUpdate({
  ticket,
  onSuccess
}: TicketStatusUpdateProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<StatusUpdateValues>({
    resolver: zodResolver(statusUpdateSchema),
    defaultValues: {
      status: ticket.status,
      resolutionDetails: ticket.resolutionDetails || "",
      timeSpent: ticket.timeSpent || "",
      costIncurred: ticket.costIncurred || ""
    }
  })

  async function onSubmit(data: StatusUpdateValues) {
    try {
      setIsLoading(true)
      console.log("Form submitted with data:", data)

      // If status is being changed to completed/closed, resolution details are required
      if (
        (data.status === "completed" || data.status === "closed") &&
        !data.resolutionDetails
      ) {
        console.log("Resolution details required but not provided")
        form.setError("resolutionDetails", {
          type: "manual",
          message:
            "Resolution details are required when completing or closing a ticket"
        })
        setIsLoading(false)
        return
      }

      // Only include resolution fields if status is completed or closed
      const isResolutionRequired =
        data.status === "completed" || data.status === "closed"

      const updateData: Partial<InsertTicket> = {
        status: data.status,
        ...(isResolutionRequired
          ? {
              resolutionDetails: data.resolutionDetails || null,
              timeSpent: data.timeSpent || null,
              costIncurred: data.costIncurred || null
            }
          : {
              resolutionDetails: null,
              timeSpent: null,
              costIncurred: null
            }),
        ...(data.status === "closed" ? { closedAt: new Date() } : {})
      }

      console.log("Calling updateTicketAction with:", updateData)
      const result = await updateTicketAction(ticket.id, updateData)
      console.log("Update result:", result)

      if (result.isSuccess) {
        toast.success("Ticket status updated successfully")
        onSuccess?.()
        router.refresh()
      } else {
        toast.error("Failed to update ticket status. Please try again.")
      }
    } catch (error) {
      console.error("Error updating ticket:", error)
      toast.error("Something went wrong while updating the ticket")
    } finally {
      setIsLoading(false)
    }
  }

  const currentStatus = form.watch("status")
  const showResolutionFields =
    currentStatus === "completed" || currentStatus === "closed"

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="completed_by_chat">
                    Completed by Chat
                  </SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Update the current status of the ticket
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {showResolutionFields && (
          <>
            <FormField
              control={form.control}
              name="resolutionDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resolution Details</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe how the issue was resolved"
                      className="min-h-[100px]"
                      {...field}
                      value={field.value || ""}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide details about how the issue was resolved
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="timeSpent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Spent</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 2 hours"
                        {...field}
                        value={field.value || ""}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormDescription>
                      Record the time spent on resolution
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="costIncurred"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cost Incurred</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., $150"
                        {...field}
                        value={field.value || ""}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormDescription>
                      Record any costs associated with the resolution
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Status"}
        </Button>
      </form>
    </Form>
  )
}
