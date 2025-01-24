"use client"

import { createTicketAction } from "@/actions/db/tickets-actions"
import { getUserRolesAction } from "@/actions/db/user-roles-actions"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CreateTicketInput, UserRoleWithDetails } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { auth } from "@clerk/nextjs/server"

interface TicketFormProps {
  orgId: string
  userRole: "ADMIN" | "EMPLOYEE" | "MAINTENANCE" | "TENANT"
}

const ticketFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.enum(["maintenance", "billing", "noise_complaint", "other"]),
  priority: z.enum(["low", "medium", "high", "critical"]),
  propertyId: z.string().min(1, "Property is required"),
  costEstimate: z.string().optional(),
  timeEstimate: z.string().optional(),
  emergencyLevel: z.string().optional(),
  userTone: z.string().optional(),
  chatSummary: z.string().optional(),
  resolutionDetails: z.string().optional(),
  timeSpent: z.string().optional(),
  costIncurred: z.string().optional()
})

type FormData = z.infer<typeof ticketFormSchema>

export function TicketForm({ orgId, userRole }: TicketFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [properties, setProperties] = useState<UserRoleWithDetails[]>([])
  const isStaff = userRole !== "TENANT"

  const form = useForm<FormData>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "maintenance",
      priority: "low",
      propertyId: "",
      costEstimate: "",
      timeEstimate: "",
      emergencyLevel: "",
      userTone: "",
      chatSummary: "",
      resolutionDetails: "",
      timeSpent: "",
      costIncurred: ""
    }
  })

  useEffect(() => {
    async function loadProperties() {
      try {
        const { data } = await getUserRolesAction(orgId)
        if (data) {
          const propertyRoles = data
            .filter(role => role.property)
            .filter(
              (role, index, self) =>
                index === self.findIndex(r => r.propertyId === role.propertyId)
            )
          setProperties(propertyRoles)

          // If tenant, auto-select their property
          if (userRole === "TENANT" && propertyRoles.length === 1) {
            form.setValue("propertyId", propertyRoles[0].propertyId!)
          }
        }
      } catch (error) {
        console.error("Error loading properties:", error)
        toast.error("Failed to load properties")
      }
    }

    loadProperties()
  }, [orgId, form, userRole])

  async function onSubmit(data: z.infer<typeof ticketFormSchema>) {
    try {
      const authData = await auth()
      const userId = authData.userId
      if (!userId) {
        toast.error("You must be logged in to create a ticket")
        return
      }

      const ticket = {
        ...data,
        tenantId: userId,
        id: crypto.randomUUID(),
        status: "open" as const
      }

      const result = await createTicketAction(ticket)
      if (result.isSuccess) {
        toast.success(result.message)
        form.reset()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      console.error("Error creating ticket:", error)
      toast.error("Failed to create ticket")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isLoading}
                  placeholder="Enter ticket title"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  disabled={isLoading}
                  placeholder="Describe your issue"
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="noise_complaint">
                      Noise Complaint
                    </SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="propertyId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property</FormLabel>
              <Select
                disabled={
                  isLoading ||
                  (userRole === "TENANT" && properties.length === 1)
                }
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a property" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {properties.map(role => (
                    <SelectItem key={role.propertyId} value={role.propertyId!}>
                      {role.property?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Staff-only fields */}
        {isStaff && (
          <>
            <FormField
              control={form.control}
              name="costEstimate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost Estimate</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter cost estimate"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timeEstimate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time Estimate</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter time estimate"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emergencyLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emergency Level</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter emergency level"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit Ticket"}
        </Button>
      </form>
    </Form>
  )
}
