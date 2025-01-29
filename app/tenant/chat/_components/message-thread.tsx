"use client"

import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"
import { Attachment, Message } from "@/types/chat-types"

interface MessageThreadProps {
  messages: Message[]
  messageAlignment?: "default" | "compact"
}

const messageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
}

const attachmentVariants = {
  initial: {
    opacity: 0,
    x: -20
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      delay: 0.1
    }
  }
}

function AttachmentPreview({ attachment }: { attachment: Attachment }) {
  const isImage = attachment.type.startsWith("image/")
  const formattedSize = Math.round(attachment.size / 1024)
  const sizeLabel = `${formattedSize}KB`

  return (
    <motion.div
      variants={attachmentVariants}
      initial="initial"
      animate="animate"
      className="bg-background hover:bg-accent/50 flex items-center gap-2 rounded-md border p-2 transition-colors"
      role="group"
      aria-label={`Attachment: ${attachment.name}, Size: ${sizeLabel}`}
    >
      {isImage ? (
        <div className="relative size-20 overflow-hidden">
          <img
            src={attachment.url}
            alt={`Preview of ${attachment.name}`}
            className="size-full rounded-md object-cover transition-transform hover:scale-110"
          />
        </div>
      ) : (
        <div
          className="bg-muted flex size-20 items-center justify-center rounded-md"
          role="img"
          aria-label="File icon"
        >
          <FileText className="text-muted-foreground size-8" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-1">
        <p className="truncate text-sm font-medium" title={attachment.name}>
          {attachment.name}
        </p>
        <p
          className="text-muted-foreground text-xs"
          aria-label={`File size: ${sizeLabel}`}
        >
          {sizeLabel}
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-accent group-hover:bg-accent/50 w-full gap-2"
          asChild
          aria-label={`Download ${attachment.name}`}
        >
          <a
            href={attachment.url}
            download={attachment.name}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") {
                e.currentTarget.click()
              }
            }}
          >
            <Download className="size-4" aria-hidden="true" />
            <span>Download</span>
          </a>
        </Button>
      </div>
    </motion.div>
  )
}

export default function MessageThread({
  messages,
  messageAlignment = "default"
}: MessageThreadProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <ScrollArea className="h-full">
      <div
        ref={scrollRef}
        className={cn(
          "flex flex-col p-4",
          messageAlignment === "compact" ? "space-y-2" : "space-y-4"
        )}
        role="log"
        aria-label="Chat messages"
        aria-live="polite"
      >
        <AnimatePresence initial={false}>
          {messages.map(message => (
            <motion.div
              key={message.id}
              layout
              variants={messageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={cn(
                "flex w-full flex-col gap-2",
                message.role === "user" ? "items-end" : "items-start",
                messageAlignment === "compact" && "gap-1"
              )}
              role="article"
              aria-label={`${message.role === "user" ? "Your message" : "AI response"}`}
            >
              <motion.div
                layout
                className={cn(
                  "rounded-lg px-4 py-2",
                  messageAlignment === "compact"
                    ? "max-w-[90%] px-3 py-1.5"
                    : "max-w-[80%]",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <p
                  className={cn(
                    "whitespace-pre-wrap",
                    messageAlignment === "compact" ? "text-xs" : "text-sm"
                  )}
                >
                  {message.content}
                </p>
              </motion.div>

              {message.attachments && message.attachments.length > 0 && (
                <motion.div
                  layout
                  className={cn(
                    "flex flex-col gap-2",
                    messageAlignment === "compact"
                      ? "max-w-[90%]"
                      : "max-w-[80%]"
                  )}
                  role="list"
                  aria-label="Message attachments"
                >
                  {message.attachments.map(attachment => (
                    <AttachmentPreview
                      key={attachment.id}
                      attachment={attachment}
                    />
                  ))}
                </motion.div>
              )}

              <motion.span
                layout
                className={cn(
                  "text-muted-foreground opacity-70 transition-opacity hover:opacity-100",
                  messageAlignment === "compact" ? "text-[10px]" : "text-xs"
                )}
                aria-label={`Sent at ${new Date(message.createdAt).toLocaleTimeString()}`}
              >
                {new Date(message.createdAt).toLocaleTimeString()}
              </motion.span>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={endRef} aria-hidden="true" />
      </div>
    </ScrollArea>
  )
}
