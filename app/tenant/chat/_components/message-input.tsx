"use client"

import { useState, useRef, useEffect } from "react"
import { SendHorizontal, Paperclip, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MessageInputProps } from "@/types/chat-types"
import FileUpload from "./file-upload"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"

export default function MessageInput({
  onSendMessage,
  disabled
}: MessageInputProps) {
  const [message, setMessage] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    // Focus textarea on mount
    textareaRef.current?.focus()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if ((!message.trim() && files.length === 0) || disabled) return

    onSendMessage(message, files)
    setMessage("")
    setFiles([])
    setIsUploadOpen(false)
    textareaRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !disabled) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleFileSelect = (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles])
    setIsUploadOpen(false)
    textareaRef.current?.focus()
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleFileKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      removeFile(index)
    }
  }

  return (
    <div className="space-y-4">
      {files.length > 0 && (
        <div
          className="flex flex-wrap gap-2"
          role="list"
          aria-label="Selected files"
        >
          {files.map((file, index) => (
            <div
              key={index}
              className="bg-muted flex items-center gap-2 rounded-full px-3 py-1 text-sm"
              role="listitem"
              tabIndex={0}
              onKeyDown={e => handleFileKeyDown(e, index)}
              aria-label={`${file.name}, press Delete or Backspace to remove`}
            >
              <span className="max-w-[150px] truncate" title={file.name}>
                {file.name}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="size-4 p-0"
                onClick={() => removeFile(index)}
                aria-label={`Remove ${file.name}`}
              >
                <X className="size-3" aria-hidden="true" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex space-x-2"
        aria-label="Message input form"
      >
        <Popover open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="shrink-0"
              disabled={disabled}
              aria-label="Attach files"
            >
              <Paperclip className="size-5" aria-hidden="true" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-80 p-3"
            side="top"
            align="start"
            alignOffset={-40}
          >
            <FileUpload
              onFileSelect={handleFileSelect}
              disabled={disabled}
              maxFiles={5}
              maxSize={5 * 1024 * 1024} // 5MB
            />
          </PopoverContent>
        </Popover>

        <Textarea
          ref={textareaRef}
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="min-h-[60px] flex-1 resize-none"
          disabled={disabled}
          aria-label="Message input"
          aria-multiline="true"
          aria-describedby="message-help"
        />

        <Button
          type="submit"
          size="icon"
          disabled={(!message.trim() && files.length === 0) || disabled}
          className="shrink-0"
          aria-label="Send message"
        >
          <SendHorizontal className="size-5" aria-hidden="true" />
        </Button>
      </form>
      <span id="message-help" className="sr-only">
        Press Enter to send, Shift + Enter for new line
      </span>
    </div>
  )
}
