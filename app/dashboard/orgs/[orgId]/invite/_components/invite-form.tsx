"use client"

import { createInviteAction } from "@/actions/db/invites-actions"
import { getPropertiesForOrgAction } from "@/actions/db/properties-actions"
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
import { CreateInviteInput, OrgRole, Property } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Copy, Check } from "lucide-react"

const roleEnum = ["ADMIN", "EMPLOYEE", "MAINTENANCE", "TENANT"] as const
type RoleType = (typeof roleEnum)[number]

const formSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    role: z.enum(roleEnum),
    propertyId: z.string().optional()
  })
  .refine(
    data => {
      if (data.role === "TENANT") {
        return !!data.propertyId
      }
      return true
    },
    {
      message: "Property is required for tenants",
      path: ["propertyId"]
    }
  )

type FormData = z.infer<typeof formSchema>

interface InviteFormProps {
  orgId: string
}

export function InviteForm({ orgId }: InviteFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingProperties, setIsLoadingProperties] = useState(false)
  const [properties, setProperties] = useState<Property[]>([])
  const [inviteLink, setInviteLink] = useState<string | null>(null)
  const [isCopied, setIsCopied] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      role: "EMPLOYEE",
      propertyId: undefined
    }
  })

  const selectedRole = form.watch("role")
  const isTenantRole = selectedRole === "TENANT"

  // Load properties when form is mounted
  useEffect(() => {
    async function loadProperties() {
      try {
        setIsLoadingProperties(true)
        const result = await getPropertiesForOrgAction(orgId)
        if (result.isSuccess) {
          setProperties(result.data)
        } else {
          toast.error("Failed to load properties")
        }
      } catch (error) {
        console.error("Error loading properties:", error)
        toast.error("Failed to load properties")
      } finally {
        setIsLoadingProperties(false)
      }
    }

    loadProperties()
  }, [orgId])

  // Reset propertyId when role changes
  useEffect(() => {
    if (!isTenantRole) {
      form.setValue("propertyId", undefined)
    }
  }, [isTenantRole, form])

  async function onSubmit(data: FormData) {
    try {
      setIsLoading(true)
      setInviteLink(null)

      // Create the correct invite input based on role
      const input: CreateInviteInput =
        data.role === "TENANT"
          ? {
              email: data.email,
              orgId,
              role: "TENANT",
              propertyId: data.propertyId! // We know this exists due to form validation
            }
          : {
              email: data.email,
              orgId,
              role: data.role as Exclude<OrgRole, "TENANT">,
              propertyId: data.propertyId // Optional for non-tenant roles
            }

      const result = await createInviteAction(input)

      if (!result.isSuccess) {
        toast.error(result.message)
        return
      }

      toast.success(result.message)
      setInviteLink(result.data.inviteLink)
      form.reset()
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async () => {
    if (!inviteLink) return
    try {
      await navigator.clipboard.writeText(inviteLink)
      setIsCopied(true)
      toast.success("Invite link copied to clipboard")
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      toast.error("Failed to copy invite link")
    }
  }

  return (
    <div className="rounded-lg border p-4">
      <h2 className="mb-4 font-semibold">Invite User</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    disabled={isLoading}
                    placeholder="Enter email address"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="EMPLOYEE">Employee</SelectItem>
                    <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                    <SelectItem value="TENANT">Tenant</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Show property selection only for tenant role */}
          {isTenantRole && (
            <FormField
              control={form.control}
              name="propertyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property</FormLabel>
                  <Select
                    disabled={isLoading || isLoadingProperties}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            isLoadingProperties
                              ? "Loading properties..."
                              : "Select a property"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {properties.map(property => (
                        <SelectItem key={property.id} value={property.id}>
                          {property.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button
            type="submit"
            disabled={isLoading || (isTenantRole && isLoadingProperties)}
          >
            {isLoading ? "Sending..." : "Send Invite"}
          </Button>

          {inviteLink && (
            <div className="mt-4 space-y-2">
              <div className="text-sm font-medium">Invite Link:</div>
              <div className="bg-muted flex items-center gap-2 rounded-md border p-2">
                <div className="flex-1 truncate text-sm">{inviteLink}</div>
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {isCopied ? (
                    <Check className="size-4" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  )
}
