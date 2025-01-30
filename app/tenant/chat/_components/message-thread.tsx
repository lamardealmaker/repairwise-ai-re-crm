"use client"

import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"
import { Attachment, Message, ChatSettings } from "@/types/chat-types"
import TypingIndicator from "./typing-indicator"

export interface MessageThreadProps {
  messages: Message[]
  isTyping: boolean
  settings: ChatSettings
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
  isTyping,
  settings
}: MessageThreadProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "assistant" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`rounded-lg p-4 ${
                message.role === "assistant"
                  ? "bg-gray-100"
                  : "bg-blue-500 text-white"
              } ${settings.messageAlignment === "right" ? "max-w-[75%]" : ""}`}
            >
              <div className="whitespace-pre-wrap">{message.content}</div>
              {message.attachments && message.attachments.length > 0 && (
                <div className="mt-2 space-y-1">
                  {message.attachments.map(attachment => (
                    <div
                      key={attachment.id}
                      className="flex items-center gap-2 text-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-4"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      <a
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {attachment.name}
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="rounded-lg bg-gray-100 p-4">
              <div className="flex items-center gap-1">
                <div className="size-2 animate-bounce rounded-full bg-gray-400" />
                <div className="size-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.2s]" />
                <div className="size-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
    </div>
  )
}
