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
        ...(data.status === "closed"
          ? {
              closedAt: new Date()
            }
          : {})
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
    <Form {...form} data-oid="3i.h6x4">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        data-oid="5mr61mk"
      >
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem data-oid="jvm3:84">
              <FormLabel data-oid="8qq7u_0">Status</FormLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={isLoading}
                data-oid="4-.vsfh"
              >
                <FormControl data-oid="buwcxrh">
                  <SelectTrigger data-oid="8e0v-a7">
                    <SelectValue
                      placeholder="Select status"
                      data-oid="0azv3:8"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent data-oid="bsv.:n4">
                  <SelectItem value="open" data-oid="g4drpud">
                    Open
                  </SelectItem>
                  <SelectItem value="in_progress" data-oid="8p:z7cm">
                    In Progress
                  </SelectItem>
                  <SelectItem value="completed" data-oid="jn0z3t2">
                    Completed
                  </SelectItem>
                  <SelectItem value="completed_by_chat" data-oid="glrqm9.">
                    Completed by Chat
                  </SelectItem>
                  <SelectItem value="closed" data-oid="d0e4mai">
                    Closed
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription data-oid="0gecm:5">
                Update the current status of the ticket
              </FormDescription>
              <FormMessage data-oid="6hup:2s" />
            </FormItem>
          )}
          data-oid="-bhr4ki"
        />

        {showResolutionFields && (
          <>
            <FormField
              control={form.control}
              name="resolutionDetails"
              render={({ field }) => (
                <FormItem data-oid="33i2g-7">
                  <FormLabel data-oid="nb-c0vc">Resolution Details</FormLabel>
                  <FormControl data-oid="wcbkv7.">
                    <Textarea
                      placeholder="Describe how the issue was resolved"
                      className="min-h-[100px]"
                      {...field}
                      value={field.value || ""}
                      disabled={isLoading}
                      data-oid="91:4qtq"
                    />
                  </FormControl>
                  <FormDescription data-oid="n6_t7ea">
                    Provide details about how the issue was resolved
                  </FormDescription>
                  <FormMessage data-oid="g6x_o-x" />
                </FormItem>
              )}
              data-oid="a-4o8ly"
            />

            <div
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
              data-oid="u.it11i"
            >
              <FormField
                control={form.control}
                name="timeSpent"
                render={({ field }) => (
                  <FormItem data-oid="8wl5x.p">
                    <FormLabel data-oid="of9fg5k">Time Spent</FormLabel>
                    <FormControl data-oid="m36f.jn">
                      <Textarea
                        placeholder="e.g., 2 hours"
                        {...field}
                        value={field.value || ""}
                        disabled={isLoading}
                        data-oid="-aj1o1l"
                      />
                    </FormControl>
                    <FormDescription data-oid="biz.yh1">
                      Record the time spent on resolution
                    </FormDescription>
                    <FormMessage data-oid="0g2nrcz" />
                  </FormItem>
                )}
                data-oid="1ppee:p"
              />

              <FormField
                control={form.control}
                name="costIncurred"
                render={({ field }) => (
                  <FormItem data-oid="iph6wod">
                    <FormLabel data-oid="e2-ds5b">Cost Incurred</FormLabel>
                    <FormControl data-oid="dvs-m:b">
                      <Textarea
                        placeholder="e.g., $150"
                        {...field}
                        value={field.value || ""}
                        disabled={isLoading}
                        data-oid="kt:015b"
                      />
                    </FormControl>
                    <FormDescription data-oid="wwzy998">
                      Record any costs associated with the resolution
                    </FormDescription>
                    <FormMessage data-oid="-3ltmty" />
                  </FormItem>
                )}
                data-oid="l7v8dow"
              />
            </div>
          </>
        )}

        <Button type="submit" disabled={isLoading} data-oid="riwfqhr">
          {isLoading ? "Updating..." : "Update Status"}
        </Button>
      </form>
    </Form>
  )
}
