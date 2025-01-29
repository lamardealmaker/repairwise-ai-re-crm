"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Settings2, Info, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import ChatSettings from "./chat-settings"

interface ChatSettings {
  soundEnabled: boolean
  notificationsEnabled: boolean
  autoScroll: boolean
  messageAlignment: "default" | "compact"
  aiModel: "gpt-3.5" | "gpt-4"
  theme: "light" | "dark" | "system"
}

interface ChatHeaderProps {
  onToggleSidebar: () => void
  isSidebarOpen: boolean
  onClearHistory?: () => void
  onExportChat?: () => void
  onCreateTicket?: () => void
  settings: ChatSettings
  onSettingsChange: (settings: Partial<ChatSettings>) => void
}

export default function ChatHeader({
  onToggleSidebar,
  isSidebarOpen,
  onClearHistory,
  onExportChat,
  onCreateTicket,
  settings,
  onSettingsChange
}: ChatHeaderProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  return (
    <header className="flex items-center justify-between border-b px-4 py-2">
      <div className="flex items-center gap-2">
        <motion.div
          initial={false}
          animate={{
            backgroundColor: isSidebarOpen
              ? "rgb(var(--primary))"
              : "transparent",
            color: isSidebarOpen
              ? "rgb(var(--primary-foreground))"
              : "currentColor"
          }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            aria-label={
              isSidebarOpen ? "Close context sidebar" : "Open context sidebar"
            }
          >
            <Info className="size-5" />
          </Button>
        </motion.div>
        <div>
          <h1 className="text-lg font-semibold">AI Assistant</h1>
          <p className="text-muted-foreground text-sm">Here to help you</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open chat settings">
              <Settings2 className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Chat Settings</SheetTitle>
              <SheetDescription>
                Configure your chat experience
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <ChatSettings
                settings={settings}
                onSettingsChange={onSettingsChange}
              />
            </div>
          </SheetContent>
        </Sheet>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="More options">
              <MoreVertical className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={onClearHistory}
              disabled={!onClearHistory}
            >
              Clear Chat History
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onExportChat} disabled={!onExportChat}>
              Export Conversation
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={onCreateTicket}
              disabled={!onCreateTicket}
            >
              Create Ticket
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
