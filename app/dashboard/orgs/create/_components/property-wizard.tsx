"use client"

import { createPropertyAction } from "@/actions/db/properties-actions"
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
import { useRouter } from "next/navigation"
import { useState } from "react"
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
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ""
    }
  })

  async function onSubmit(data: FormData) {
    try {
      setIsLoading(true)

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
    } finally {
      setIsLoading(false)
    }
  }

  function onSkip() {
    router.push(`/dashboard/orgs/${orgId}`)
  }

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Create Your First Property</h2>
        <p className="text-muted-foreground">
          Add a property to get started or skip for now
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading}
                    placeholder="Enter property name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Property"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={onSkip}
            >
              Skip for now
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
