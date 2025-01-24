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

interface TicketFormProps {
  orgId: string
  userRole: "ADMIN" | "EMPLOYEE" | "MAINTENANCE" | "TENANT"
  userId: string
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

export function TicketForm({ orgId, userRole, userId }: TicketFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingProperties, setIsLoadingProperties] = useState(true)
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
        setIsLoadingProperties(true)
        const { data } = await getUserRolesAction(userId)

        if (!data) {
          toast.error("Failed to load properties")
          return
        }

        const propertyRoles = data
          .filter(role => role.property)
          .filter(
            (role, index, self) =>
              index === self.findIndex(r => r.propertyId === role.propertyId)
          )
        setProperties(propertyRoles)

        if (userRole === "TENANT") {
          if (propertyRoles.length === 0) {
            toast.error("No property assigned to your account")
          } else if (propertyRoles.length === 1) {
            form.setValue("propertyId", propertyRoles[0].propertyId!)
          }
        }
      } catch (error) {
        console.error("Error loading properties:", error)
        toast.error("Failed to load properties")
      } finally {
        setIsLoadingProperties(false)
      }
    }

    loadProperties()
  }, [userId, form, userRole])

  async function onSubmit(data: z.infer<typeof ticketFormSchema>) {
    try {
      setIsLoading(true)

      if (!userId) {
        toast.error("You must be logged in to create a ticket")
        return
      }

      if (userRole === "TENANT" && properties.length === 0) {
        toast.error("No property assigned to your account")
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
        router.push("/tenant/tickets")
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      console.error("Error creating ticket:", error)
      toast.error("Failed to create ticket")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingProperties) {
    return (
      <div className="space-y-4 rounded-lg border p-4">
        <div className="bg-muted h-4 w-1/4 animate-pulse rounded"></div>
        <div className="bg-muted h-10 animate-pulse rounded"></div>
      </div>
    )
  }

  if (userRole === "TENANT" && properties.length === 0) {
    return (
      <div className="rounded-lg border p-4">
        <p className="text-destructive">
          No property has been assigned to your account. Please contact your
          property manager.
        </p>
      </div>
    )
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

        {isStaff && (
          <FormField
            control={form.control}
            name="propertyId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property</FormLabel>
                <Select
                  disabled={isLoading}
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
                      <SelectItem
                        key={role.propertyId}
                        value={role.propertyId!}
                      >
                        {role.property?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

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
          {isLoading ? "Creating..." : "Create Ticket"}
        </Button>
      </form>
    </Form>
  )
}
