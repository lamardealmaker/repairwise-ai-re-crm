"use client"

import { createOrganizationAction } from "@/actions/db/organizations-actions"
import { getUserByClerkIdAction } from "@/actions/db/users-actions"
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
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
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
  const { userId } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPropertyWizard, setShowPropertyWizard] = useState(false)
  const [orgId, setOrgId] = useState<string>("")

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ""
    }
  })

  // Verify user role on mount
  useEffect(() => {
    async function verifyRole() {
      if (!userId) return

      const userResult = await getUserByClerkIdAction(userId)
      if (!userResult.isSuccess || !userResult.data) {
        toast.error("User not found")
        router.push("/")
        return
      }

      // Only staff users can create organizations
      if (userResult.data.role !== "staff") {
        toast.error("Only staff members can create organizations")
        router.push("/")
        return
      }
    }

    verifyRole()
  }, [userId, router])

  async function onSubmit(data: FormData) {
    if (!userId) {
      toast.error("You must be logged in to create an organization")
      return
    }

    try {
      setIsLoading(true)

      // Verify role again before creating organization
      const userResult = await getUserByClerkIdAction(userId)
      if (
        !userResult.isSuccess ||
        !userResult.data ||
        userResult.data.role !== "staff"
      ) {
        toast.error("Only staff members can create organizations")
        return
      }

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
      console.error("Error creating organization:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (showPropertyWizard) {
    return <PropertyWizard orgId={orgId} />
  }

  return (
    <div className="rounded-lg border p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading}
                    placeholder="Enter organization name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Organization"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
