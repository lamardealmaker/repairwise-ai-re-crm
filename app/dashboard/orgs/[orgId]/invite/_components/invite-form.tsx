"use client"

import { createInviteAction } from "@/actions/db/invites-actions"
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
import { CreateInviteInput, OrgRole } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  role: z.enum(["ADMIN", "EMPLOYEE", "MAINTENANCE", "TENANT"] as const),
  propertyId: z.string().optional()
})

type FormData = z.infer<typeof formSchema>

interface InviteFormProps {
  orgId: string
}

export function InviteForm({ orgId }: InviteFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      role: "EMPLOYEE"
    }
  })

  async function onSubmit(data: FormData) {
    try {
      setIsLoading(true)

      const input: CreateInviteInput = {
        email: data.email,
        orgId,
        propertyId: data.propertyId,
        role: data.role as OrgRole
      }

      const result = await createInviteAction(input)

      if (!result.isSuccess) {
        toast.error(result.message)
        return
      }

      toast.success(result.message)
      form.reset()
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
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

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Invite"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
