"use client"

import { createPropertyAction } from "@/actions/db/properties-actions"
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
import { CreatePropertyInput } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const formSchema = z.object({
  name: z.string().min(1, "Property name is required")
})

type FormData = z.infer<typeof formSchema>

interface PropertyWizardProps {
  orgId: string
}

export function PropertyWizard({ orgId }: PropertyWizardProps) {
  const router = useRouter()
  const { userId } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

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

      // Only staff users can create properties
      if (userResult.data.role !== "staff") {
        toast.error("Only staff members can create properties")
        router.push("/")
        return
      }
    }

    verifyRole()
  }, [userId, router])

  async function onSubmit(data: FormData) {
    if (!userId) {
      toast.error("You must be logged in to create a property")
      return
    }

    try {
      setIsLoading(true)

      // Verify role again before creating property
      const userResult = await getUserByClerkIdAction(userId)
      if (
        !userResult.isSuccess ||
        !userResult.data ||
        userResult.data.role !== "staff"
      ) {
        toast.error("Only staff members can create properties")
        return
      }

      const input: CreatePropertyInput = {
        name: data.name,
        orgId
      }

      const result = await createPropertyAction(input)
      if (!result.isSuccess) {
        toast.error(result.message)
        return
      }

      toast.success(result.message)
      router.push(`/dashboard/orgs/${orgId}`)
    } catch (error) {
      toast.error("Something went wrong")
      console.error("Error creating property:", error)
    } finally {
      setIsLoading(false)
    }
  }

  function onSkip() {
    router.push(`/dashboard/orgs/${orgId}`)
  }

  return (
    <div className="rounded-lg border p-4" data-oid="m:f3w-p">
      <div className="mb-6" data-oid="x1mq7_4">
        <h2 className="text-lg font-semibold" data-oid="phsqn4:">
          Create Your First Property
        </h2>
        <p className="text-muted-foreground" data-oid="2nm18c2">
          Add a property to get started or skip for now
        </p>
      </div>

      <Form {...form} data-oid="un42-z:">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          data-oid="pq1qz6b"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem data-oid="-55eeqz">
                <FormLabel data-oid="a70hdcx">Property Name</FormLabel>
                <FormControl data-oid="9wo1sbe">
                  <Input
                    {...field}
                    disabled={isLoading}
                    placeholder="Enter property name"
                    data-oid="cpr413p"
                  />
                </FormControl>
                <FormMessage data-oid="z2rpnat" />
              </FormItem>
            )}
            data-oid="ehs541e"
          />

          <div className="flex gap-4" data-oid="bbs_e2w">
            <Button type="submit" disabled={isLoading} data-oid="z8oh-rp">
              {isLoading ? "Creating..." : "Create Property"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={onSkip}
              data-oid="w9p0bg4"
            >
              Skip for now
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
