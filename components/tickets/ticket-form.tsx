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
      <div className="space-y-4 rounded-lg border p-4" data-oid="1g4300s">
        <div
          className="bg-muted h-4 w-1/4 animate-pulse rounded"
          data-oid="slws081"
        ></div>
        <div
          className="bg-muted h-10 animate-pulse rounded"
          data-oid="n2hd:lt"
        ></div>
      </div>
    )
  }
  if (userRole === "TENANT" && properties.length === 0) {
    return (
      <div className="rounded-lg border p-4" data-oid="hqbabiy">
        <p className="text-destructive" data-oid=".hg4638">
          No property has been assigned to your account. Please contact your
          property manager.
        </p>
      </div>
    )
  }
  return (
    <Form {...form} data-oid="i-m46sr">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        data-oid="6tm1nvf"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem data-oid="upcs0vs">
              <FormLabel data-oid="_p06cq.">Title</FormLabel>
              <FormControl data-oid="-g:sc0z">
                <Input
                  {...field}
                  disabled={isLoading}
                  placeholder="Enter ticket title"
                  data-oid="4wfjman"
                />
              </FormControl>
              <FormMessage data-oid="zxt6mij" />
            </FormItem>
          )}
          data-oid="8pna:qb"
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem data-oid="g33o6y_">
              <FormLabel data-oid="tfs6jhr">Description</FormLabel>
              <FormControl data-oid="o7ms_.e">
                <Textarea
                  {...field}
                  disabled={isLoading}
                  placeholder="Describe your issue"
                  rows={4}
                  data-oid=":o2b98_"
                />
              </FormControl>
              <FormMessage data-oid="acfq1pd" />
            </FormItem>
          )}
          data-oid="60-ism5"
        />

        <div className="grid grid-cols-2 gap-4" data-oid="roypjea">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem data-oid="yjhmb-3">
                <FormLabel data-oid="ykxwcr:">Category</FormLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  data-oid="qoi-ep7"
                >
                  <FormControl data-oid="hbvlj_v">
                    <SelectTrigger data-oid="a3jj_4d">
                      <SelectValue
                        placeholder="Select a category"
                        data-oid="fbc0fbp"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent data-oid="cobx06o">
                    <SelectItem value="maintenance" data-oid="kyf3-7b">
                      Maintenance
                    </SelectItem>
                    <SelectItem value="billing" data-oid="r.bz3.5">
                      Billing
                    </SelectItem>
                    <SelectItem value="noise_complaint" data-oid="pkq_9bz">
                      Noise Complaint
                    </SelectItem>
                    <SelectItem value="other" data-oid="m1d:qy8">
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage data-oid="gap2gua" />
              </FormItem>
            )}
            data-oid="sxrsw83"
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem data-oid="ol6mbll">
                <FormLabel data-oid="c57-6og">Priority</FormLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  data-oid="x::mh5u"
                >
                  <FormControl data-oid="ixx_za7">
                    <SelectTrigger data-oid="vcwz33_">
                      <SelectValue
                        placeholder="Select priority"
                        data-oid="1nl.6hz"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent data-oid="ee.u02q">
                    <SelectItem value="low" data-oid="ssv:93t">
                      Low
                    </SelectItem>
                    <SelectItem value="medium" data-oid="xsr3.f2">
                      Medium
                    </SelectItem>
                    <SelectItem value="high" data-oid="zunq7l0">
                      High
                    </SelectItem>
                    <SelectItem value="critical" data-oid="skp_zzv">
                      Critical
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage data-oid="rtptcsp" />
              </FormItem>
            )}
            data-oid="pjcz8pb"
          />
        </div>

        {isStaff && (
          <FormField
            control={form.control}
            name="propertyId"
            render={({ field }) => (
              <FormItem data-oid="oawj_bi">
                <FormLabel data-oid="76.h:9i">Property</FormLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  data-oid="ah:1k1c"
                >
                  <FormControl data-oid="4:6yvl.">
                    <SelectTrigger data-oid="sfdbalm">
                      <SelectValue
                        placeholder="Select a property"
                        data-oid="ma-f0jp"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent data-oid="ueqpz56">
                    {properties.map(role => (
                      <SelectItem
                        key={role.propertyId}
                        value={role.propertyId!}
                        data-oid="mi-g8k8"
                      >
                        {role.property?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage data-oid="l3hh:o8" />
              </FormItem>
            )}
            data-oid="fkc_z4o"
          />
        )}

        {isStaff && (
          <>
            <FormField
              control={form.control}
              name="costEstimate"
              render={({ field }) => (
                <FormItem data-oid="07lawks">
                  <FormLabel data-oid="-hkayia">Cost Estimate</FormLabel>
                  <FormControl data-oid="x2gyxx1">
                    <Input
                      type="text"
                      placeholder="Enter cost estimate"
                      {...field}
                      data-oid="yajvui1"
                    />
                  </FormControl>
                  <FormMessage data-oid="485r:vu" />
                </FormItem>
              )}
              data-oid="_nipyty"
            />

            <FormField
              control={form.control}
              name="timeEstimate"
              render={({ field }) => (
                <FormItem data-oid="gmgg.6t">
                  <FormLabel data-oid="nnekq26">Time Estimate</FormLabel>
                  <FormControl data-oid="t200c_5">
                    <Input
                      type="text"
                      placeholder="Enter time estimate"
                      {...field}
                      data-oid="ic6o0nm"
                    />
                  </FormControl>
                  <FormMessage data-oid="--3vicp" />
                </FormItem>
              )}
              data-oid="q3247uw"
            />

            <FormField
              control={form.control}
              name="emergencyLevel"
              render={({ field }) => (
                <FormItem data-oid="c_isn.w">
                  <FormLabel data-oid="5_y7r-f">Emergency Level</FormLabel>
                  <FormControl data-oid="3-o:ch1">
                    <Input
                      type="text"
                      placeholder="Enter emergency level"
                      {...field}
                      data-oid="mu0.8b_"
                    />
                  </FormControl>
                  <FormMessage data-oid="loddri." />
                </FormItem>
              )}
              data-oid="v01q7.i"
            />
          </>
        )}

        <Button type="submit" disabled={isLoading} data-oid="1j75i.o">
          {isLoading ? "Creating..." : "Create Ticket"}
        </Button>
      </form>
    </Form>
  )
}
