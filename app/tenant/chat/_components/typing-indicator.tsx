"use client"

import { motion } from "framer-motion"

const dotVariants = {
  initial: { y: 0 },
  animate: { y: -5 }
}

const containerVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2
    }
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.2
    }
  }
}

export default function TypingIndicator() {
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="text-muted-foreground flex items-center gap-2 text-sm"
    >
      <div className="flex gap-1">
        {[0, 1, 2].map(i => (
          <motion.span
            key={i}
            variants={dotVariants}
            animate="animate"
            initial="initial"
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 0.4,
              delay: i * 0.1
            }}
            className="size-1.5 rounded-full bg-current"
          />
        ))}
      </div>
      <span>AI is typing</span>
    </motion.div>
  )
}
