"use client"

import { motion } from "framer-motion"

export interface FeedbackToastProps {
  message: string
  type: "error" | "success" | "info"
  onClose: () => void
}

export default function FeedbackToast({
  message,
  type,
  onClose
}: FeedbackToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`fixed bottom-4 right-4 rounded-lg p-4 text-white ${
        type === "error"
          ? "bg-red-500"
          : type === "success"
            ? "bg-green-500"
            : "bg-blue-500"
      }`}
    >
      {message}
      <button onClick={onClose} className="ml-2 text-white hover:text-gray-200">
        ×
      </button>
    </motion.div>
  )
}
