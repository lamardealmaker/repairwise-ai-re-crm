"use client"

import { createTicketMessageAction } from "@/actions/db/ticket-messages-actions"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { SelectTicketMessage } from "@/db/schema"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { formatDistanceToNow } from "date-fns"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const formSchema = z.object({
  message: z.string().min(1, "Message cannot be empty")
})

interface TicketMessageThreadProps {
  ticketId: string
  messages: SelectTicketMessage[]
  currentUserId: string
}

export function TicketMessageThread({
  ticketId,
  messages,
  currentUserId
}: TicketMessageThreadProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: ""
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { isSuccess, message } = await createTicketMessageAction({
        id: crypto.randomUUID(),
        ticketId,
        message: values.message,
        senderId: currentUserId
      })

      if (!isSuccess) {
        toast.error(message)
        return
      }

      form.reset()
      toast.success(message)
    } catch (error) {
      console.error("Error creating message:", error)
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={cn(
              "flex flex-col gap-2 rounded-lg p-4",
              message.senderId === currentUserId
                ? "bg-primary text-primary-foreground ml-auto"
                : "bg-muted"
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  {message.senderId === currentUserId ? "You" : "Staff"}
                </span>
              </div>
              <span className="text-xs">
                {formatDistanceToNow(new Date(message.createdAt), {
                  addSuffix: true
                })}
              </span>
            </div>
            <p>{message.message}</p>
          </div>
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Type your message here..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
