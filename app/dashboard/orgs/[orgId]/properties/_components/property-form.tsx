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
  name: z.string().min(1, "Name is required")
})

type FormData = z.infer<typeof formSchema>

interface PropertyFormProps {
  orgId: string
}

export function PropertyForm({ orgId }: PropertyFormProps) {
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
        orgId,
        name: data.name
      }

      const result = await createPropertyAction(input)

      if (!result.isSuccess) {
        toast.error(result.message)
        return
      }

      toast.success(result.message)
      form.reset()
      router.push(`/dashboard/orgs/${orgId}/properties`)
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="rounded-lg border p-4">
      <h2 className="mb-4 font-semibold">Add New Property</h2>
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

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Property"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
