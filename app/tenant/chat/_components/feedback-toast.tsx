"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeedbackToastProps {
  message: string
  type: "error" | "success" | "info"
  onDismiss: () => void
  duration?: number
}

const toastVariants = {
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
    y: 20,
    transition: {
      duration: 0.2
    }
  }
}

const icons = {
  error: XCircle,
  success: CheckCircle2,
  info: AlertCircle
}

const styles = {
  error: "bg-destructive text-destructive-foreground",
  success: "bg-green-600 text-white",
  info: "bg-blue-600 text-white"
}

export default function FeedbackToast({
  message,
  type,
  onDismiss,
  duration = 5000
}: FeedbackToastProps) {
  const Icon = icons[type]

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onDismiss, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onDismiss])

  return (
    <AnimatePresence>
      <motion.div
        role="alert"
        variants={toastVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={cn(
          "fixed bottom-4 right-4 flex items-center gap-2 rounded-lg px-4 py-2 shadow-lg",
          styles[type]
        )}
      >
        <Icon className="size-5" aria-hidden="true" />
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={onDismiss}
          className="ml-2 rounded-full p-1 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
          aria-label="Dismiss message"
        >
          <XCircle className="size-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  )
}
