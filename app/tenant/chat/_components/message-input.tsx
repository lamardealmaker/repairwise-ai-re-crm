"use client"

import { useState, useRef } from "react"
import { ChatSettings } from "@/types/chat-types"

export interface MessageInputProps {
  onSendMessage: (content: string, files?: File[]) => Promise<void>
  isTyping: boolean
  settings: ChatSettings
}

export default function MessageInput({
  onSendMessage,
  isTyping,
  settings
}: MessageInputProps) {
  const [message, setMessage] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() && files.length === 0) return

    try {
      await onSendMessage(message, files)
      setMessage("")
      setFiles([])
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    setFiles(selectedFiles)
  }

  return (
    <form onSubmit={handleSubmit} className="border-t p-4">
      {files.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1 text-sm"
            >
              <span>{file.name}</span>
              <button
                type="button"
                onClick={() => setFiles(files.filter((_, i) => i !== index))}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          className="hidden"
          accept="image/jpeg,image/png,image/gif,application/pdf,text/plain"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center justify-center rounded-lg p-2 hover:bg-gray-100"
          disabled={isTyping}
        >
          <span className="sr-only">Attach files</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-6"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </button>
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder={isTyping ? "AI is typing..." : "Type a message"}
          className="flex-1 rounded-lg border px-4 py-2 focus:border-blue-500 focus:outline-none"
          disabled={isTyping}
        />
        <button
          type="submit"
          className="flex items-center justify-center rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600 disabled:opacity-50"
          disabled={isTyping || (!message.trim() && files.length === 0)}
        >
          <span className="sr-only">Send message</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-6"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </form>
  )
}
