"use client"

import { createTicketMessageAction } from "@/actions/db/ticket-messages-actions"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { InsertTicketMessage, SelectTicketMessage } from "@/db/schema"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { formatDistanceToNow } from "date-fns"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
const messageSchema = z.object({
  message: z
    .string()
    .min(1, "Message cannot be empty")
    .max(1000, "Message must not exceed 1000 characters")
})
type MessageValues = z.infer<typeof messageSchema>
interface TicketMessageThreadProps {
  ticketId: string
  messages: SelectTicketMessage[]
  currentUserId: string
  className?: string
}
export function TicketMessageThread({
  ticketId,
  messages,
  currentUserId,
  className
}: TicketMessageThreadProps) {
  const router = useRouter()
  const form = useForm<MessageValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: ""
    }
  })
  async function onSubmit(data: MessageValues) {
    const message: InsertTicketMessage = {
      id: crypto.randomUUID(),
      ticketId,
      senderId: currentUserId,
      message: data.message
    }
    const result = await createTicketMessageAction(message)
    if (result.isSuccess) {
      form.reset()
      router.refresh()
    } else {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      })
    }
  }
  return (
    <div className={cn("space-y-4", className)} data-oid="lmmbjsg">
      <div
        className="max-h-[500px] space-y-4 overflow-y-auto rounded-lg border p-4"
        data-oid="_5h7vyd"
      >
        {messages.map(message => (
          <div
            key={message.id}
            className={cn(
              "flex flex-col rounded-lg p-3",
              message.senderId === currentUserId
                ? "ml-auto max-w-[80%] bg-blue-500 text-white"
                : "mr-auto max-w-[80%] bg-gray-100"
            )}
            data-oid="nj38dku"
          >
            <div className="break-words text-sm" data-oid="6pzyv.0">
              {message.message}
            </div>
            <div
              className={cn(
                "mt-1 text-xs",
                message.senderId === currentUserId
                  ? "text-blue-100"
                  : "text-gray-500"
              )}
              data-oid="uyy:k61"
            >
              {formatDistanceToNow(new Date(message.createdAt), {
                addSuffix: true
              })}
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="py-8 text-center text-gray-500" data-oid=":p6d23p">
            No messages yet. Start the conversation!
          </div>
        )}
      </div>

      <Form {...form} data-oid="e6.sd1s">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-end gap-2"
          data-oid="uqxb7pd"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="flex-1" data-oid="l8r4i2x">
                <FormControl data-oid="ed:frga">
                  <Textarea
                    placeholder="Type your message..."
                    className="resize-none"
                    {...field}
                    data-oid="l2-t7f4"
                  />
                </FormControl>
                <FormMessage data-oid="ufm5fo9" />
              </FormItem>
            )}
            data-oid="_wvtt4:"
          />
          <Button type="submit" className="shrink-0" data-oid="7z5ba37">
            Send
          </Button>
        </form>
      </Form>
    </div>
  )
}
