"use client"

import { createOrganizationAction } from "@/actions/db/organizations-actions"
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
import { CreateOrganizationInput } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { PropertyWizard } from "@/app/dashboard/orgs/create/_components/property-wizard"
const formSchema = z.object({
  name: z.string().min(1, "Organization name is required")
})
type FormData = z.infer<typeof formSchema>
export function OrganizationForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPropertyWizard, setShowPropertyWizard] = useState(false)
  const [orgId, setOrgId] = useState<string>("")
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ""
    }
  })
  async function onSubmit(data: FormData) {
    try {
      setIsLoading(true)
      const input: CreateOrganizationInput = {
        name: data.name,
        role: "ADMIN" // Always create as admin for uninvited users
      }
      const result = await createOrganizationAction(input)
      if (!result.isSuccess) {
        toast.error(result.message)
        return
      }
      toast.success(result.message)
      setOrgId(result.data.id)
      setShowPropertyWizard(true)
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }
  if (showPropertyWizard) {
    return <PropertyWizard orgId={orgId} data-oid="_2:h__-" />
  }
  return (
    <div className="rounded-lg border p-4" data-oid="j30uw0b">
      <Form {...form} data-oid="gv4t.r:">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          data-oid="psxp6wg"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem data-oid=":qqrl1.">
                <FormLabel data-oid="zqx-73n">Organization Name</FormLabel>
                <FormControl data-oid="g6-26nd">
                  <Input
                    {...field}
                    disabled={isLoading}
                    placeholder="Enter organization name"
                    data-oid="rpl-gnx"
                  />
                </FormControl>
                <FormMessage data-oid="rsa6m7v" />
              </FormItem>
            )}
            data-oid="mo0.60p"
          />

          <Button type="submit" disabled={isLoading} data-oid="o_8zq60">
            {isLoading ? "Creating..." : "Create Organization"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
