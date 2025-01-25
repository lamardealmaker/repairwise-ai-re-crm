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
    <div className="rounded-lg border p-4" data-oid="2l7zt.1">
      <h2 className="mb-4 font-semibold" data-oid="ljdaq-u">
        Invite User
      </h2>
      <Form {...form} data-oid="caj.u-q">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          data-oid="kv:5.ws"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem data-oid="3p6jb5k">
                <FormLabel data-oid=".gtzs6u">Email</FormLabel>
                <FormControl data-oid="hz-sk0_">
                  <Input
                    {...field}
                    type="email"
                    disabled={isLoading}
                    placeholder="Enter email address"
                    data-oid="fm2zql4"
                  />
                </FormControl>
                <FormMessage data-oid="-dap5m." />
              </FormItem>
            )}
            data-oid="julp05s"
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem data-oid="um:dz05">
                <FormLabel data-oid="2-xz3ui">Role</FormLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  data-oid="t6-8ryx"
                >
                  <FormControl data-oid="2v68as2">
                    <SelectTrigger data-oid="l1lca59">
                      <SelectValue
                        placeholder="Select a role"
                        data-oid="hkj3lcv"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent data-oid="w-dypu-">
                    <SelectItem value="ADMIN" data-oid="w7oym0n">
                      Admin
                    </SelectItem>
                    <SelectItem value="EMPLOYEE" data-oid="-ugvhe7">
                      Employee
                    </SelectItem>
                    <SelectItem value="MAINTENANCE" data-oid="g0gy221">
                      Maintenance
                    </SelectItem>
                    <SelectItem value="TENANT" data-oid="raphhpa">
                      Tenant
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage data-oid="bonx4la" />
              </FormItem>
            )}
            data-oid="z04hlez"
          />

          {/* Show property selection only for tenant role */}
          {isTenantRole && (
            <FormField
              control={form.control}
              name="propertyId"
              render={({ field }) => (
                <FormItem data-oid="o7hlwg-">
                  <FormLabel data-oid="pq9ckqg">Property</FormLabel>
                  <Select
                    disabled={isLoading || isLoadingProperties}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    data-oid="ehae-ro"
                  >
                    <FormControl data-oid="hi3hc2u">
                      <SelectTrigger data-oid="wfk92xv">
                        <SelectValue
                          placeholder={
                            isLoadingProperties
                              ? "Loading properties..."
                              : "Select a property"
                          }
                          data-oid="ui0d:p3"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent data-oid="4z.cn9d">
                      {properties.map(property => (
                        <SelectItem
                          key={property.id}
                          value={property.id}
                          data-oid="njoy:f4"
                        >
                          {property.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage data-oid="ma7g7dh" />
                </FormItem>
              )}
              data-oid="-moomgc"
            />
          )}

          <Button
            type="submit"
            disabled={isLoading || (isTenantRole && isLoadingProperties)}
            data-oid="c09nqm:"
          >
            {isLoading ? "Sending..." : "Send Invite"}
          </Button>

          {inviteLink && (
            <div className="mt-4 space-y-2" data-oid="uu0wd51">
              <div className="text-sm font-medium" data-oid="xyofh1i">
                Invite Link:
              </div>
              <div
                className="bg-muted flex items-center gap-2 rounded-md border p-2"
                data-oid=".uuzsuo"
              >
                <div className="flex-1 truncate text-sm" data-oid="zrxf:oy">
                  {inviteLink}
                </div>
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="x3663vl"
                >
                  {isCopied ? (
                    <Check className="size-4" data-oid=".5ape_v" />
                  ) : (
                    <Copy className="size-4" data-oid="9jlzg28" />
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
