/*
<ai_context>
This client component provides a theme switcher for the app.
</ai_context>
*/

"use client"

import { cn } from "@/lib/utils"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { HTMLAttributes, ReactNode, useEffect, useState } from "react"
interface ThemeSwitcherProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}
export const ThemeSwitcher = ({ children, ...props }: ThemeSwitcherProps) => {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only show after mount to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) {
    return <div className={cn("p-1", props.className)} data-oid="ghe19s9" />
  }
  return (
    <div
      className={cn(
        "p-1 hover:cursor-pointer hover:opacity-50",
        props.className
      )}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      data-oid="osp6a5j"
    >
      {theme === "dark" ? (
        <Moon className="size-6" data-oid="wgou.t4" />
      ) : (
        <Sun className="size-6" data-oid="t-qrp2e" />
      )}
    </div>
  )
}
