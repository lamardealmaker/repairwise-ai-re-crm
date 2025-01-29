"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Volume2,
  VolumeX,
  Zap,
  MessageSquare,
  Bot,
  Monitor
} from "lucide-react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

interface ChatSettings {
  soundEnabled: boolean
  notificationsEnabled: boolean
  autoScroll: boolean
  messageAlignment: "default" | "compact"
  aiModel: "gpt-3.5" | "gpt-4"
  theme: "light" | "dark" | "system"
}

interface ChatSettingsProps {
  settings: ChatSettings
  onSettingsChange: (settings: Partial<ChatSettings>) => void
}

export default function ChatSettings({
  settings,
  onSettingsChange
}: ChatSettingsProps) {
  const [soundVolume, setSoundVolume] = useState(50)

  const updateSetting = <K extends keyof ChatSettings>(
    key: K,
    value: ChatSettings[K]
  ) => {
    onSettingsChange({ [key]: value })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {settings.soundEnabled ? (
                <Volume2 className="text-muted-foreground size-4" />
              ) : (
                <VolumeX className="text-muted-foreground size-4" />
              )}
              <Label htmlFor="sound">Sound Effects</Label>
            </div>
            <Switch
              id="sound"
              checked={settings.soundEnabled}
              onCheckedChange={checked =>
                updateSetting("soundEnabled", checked)
              }
            />
          </div>

          {settings.soundEnabled && (
            <div className="space-y-2">
              <Label htmlFor="volume" className="text-muted-foreground text-xs">
                Volume: {soundVolume}%
              </Label>
              <Slider
                id="volume"
                min={0}
                max={100}
                step={1}
                value={[soundVolume]}
                onValueChange={([value]) => setSoundVolume(value)}
                className="w-full"
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="text-muted-foreground size-4" />
              <Label htmlFor="notifications">Desktop Notifications</Label>
            </div>
            <Switch
              id="notifications"
              checked={settings.notificationsEnabled}
              onCheckedChange={checked =>
                updateSetting("notificationsEnabled", checked)
              }
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Chat Interface</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="text-muted-foreground size-4" />
              <Label htmlFor="message-alignment">Message Alignment</Label>
            </div>
            <Select
              value={settings.messageAlignment}
              onValueChange={value =>
                updateSetting(
                  "messageAlignment",
                  value as "default" | "compact"
                )
              }
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="compact">Compact</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="text-muted-foreground size-4" />
              <Label htmlFor="ai-model">AI Model</Label>
            </div>
            <Select
              value={settings.aiModel}
              onValueChange={value =>
                updateSetting("aiModel", value as "gpt-3.5" | "gpt-4")
              }
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Monitor className="text-muted-foreground size-4" />
              <Label htmlFor="theme">Theme</Label>
            </div>
            <Select
              value={settings.theme}
              onValueChange={value =>
                updateSetting("theme", value as "light" | "dark" | "system")
              }
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="text-muted-foreground size-4" />
              <Label htmlFor="auto-scroll">Auto-scroll to Bottom</Label>
            </div>
            <Switch
              id="auto-scroll"
              checked={settings.autoScroll}
              onCheckedChange={checked => updateSetting("autoScroll", checked)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
