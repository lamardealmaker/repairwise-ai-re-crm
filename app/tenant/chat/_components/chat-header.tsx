"use client"

import { ContextWindow } from "@/types/ai-types"
import { ChatSettings } from "@/types/chat-types"

export interface ChatHeaderProps {
  onOpenSidebar: () => void
  onClearHistory: () => Promise<string>
  onExportChat: () => void
  settings: ChatSettings
  onSettingsChange: (newSettings: Partial<ChatSettings>) => void
  context?: ContextWindow
}

export default function ChatHeader({
  onOpenSidebar,
  onClearHistory,
  onExportChat,
  settings,
  onSettingsChange,
  context
}: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b p-4">
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenSidebar}
          className="rounded-lg p-2 hover:bg-gray-100"
        >
          <span className="sr-only">Open context sidebar</span>
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
            <path d="M21 3H3C1.89543 3 1 3.89543 1 5V19C1 20.1046 1.89543 21 3 21H21C22.1046 21 23 20.1046 23 19V5C23 3.89543 22.1046 3 21 3Z" />
            <path d="M9.5 9H14.5" />
            <path d="M9.5 13H14.5" />
            <path d="M9.5 17H14.5" />
          </svg>
        </button>
        <div>
          <h1 className="text-lg font-semibold">Chat Assistant</h1>
          {context?.summary && (
            <p className="text-sm text-gray-500">{context.summary}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onClearHistory}
          className="rounded-lg p-2 hover:bg-gray-100"
        >
          <span className="sr-only">Clear chat history</span>
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
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </button>
        <button
          onClick={onExportChat}
          className="rounded-lg p-2 hover:bg-gray-100"
        >
          <span className="sr-only">Export chat</span>
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
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </button>
      </div>
    </div>
  )
}
