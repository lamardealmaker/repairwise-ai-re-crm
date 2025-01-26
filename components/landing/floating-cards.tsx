"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Building, ClipboardCheck, User, Wrench } from "lucide-react"

export const FloatingCards = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 100,
        y: (e.clientY - window.innerHeight / 2) / 100
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const cards = [
    {
      x: -20,
      y: 0,
      rotate: 1,
      scale: 1,
      content: (
        <div className="flex h-full flex-col gap-5 p-7">
          <div className="flex items-center gap-4">
            <div className="from-primary to-primary/80 rounded-full bg-gradient-to-br p-2.5">
              <User className="text-primary-foreground size-5" />
            </div>
            <div>
              <h3 className="text-foreground mb-0.5 text-lg font-semibold">
                Tenant Chat
              </h3>
              <p className="text-muted-foreground/80 text-sm">
                Live conversation
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-primary/5 ml-6 mr-2 rounded-lg p-3.5 text-[15px] backdrop-blur-sm">
              The kitchen sink is leaking
            </div>
            <div className="from-primary/10 to-primary/5 ml-2 mr-6 rounded-lg bg-gradient-to-br p-3.5 text-[15px] backdrop-blur-sm">
              Technician scheduled for tomorrow
            </div>
          </div>
        </div>
      )
    },
    {
      x: 45,
      y: 130,
      rotate: -1,
      scale: 0.97,
      content: (
        <div className="flex h-full flex-col justify-between p-6">
          <div className="flex items-center gap-3">
            <div className="from-primary to-primary/80 rounded-lg bg-gradient-to-br p-2">
              <Wrench className="text-primary-foreground size-6" />
            </div>
            <h3 className="text-foreground text-lg font-semibold">
              Maintenance Request
            </h3>
          </div>
          <div className="space-y-2">
            <div className="bg-primary/10 h-2 rounded-full" />
            <div className="bg-primary/20 h-2 w-3/4 rounded-full" />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Status: <span className="text-primary">In Progress</span>
            </span>
            <ClipboardCheck className="text-primary size-4" />
          </div>
        </div>
      )
    },
    {
      x: 70,
      y: 250,
      rotate: 2,
      scale: 0.95,
      content: (
        <div className="flex h-full flex-col gap-4 p-6">
          <div className="flex items-center gap-3">
            <div className="from-primary to-primary/80 rounded-full bg-gradient-to-br p-2">
              <User className="text-primary-foreground size-6" />
            </div>
            <div>
              <h3 className="text-foreground font-semibold">
                Completed Request
              </h3>
              <p className="text-muted-foreground text-sm">
                Kitchen sink repair
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-primary/5 ml-6 mr-2 rounded-lg p-3 text-sm backdrop-blur-sm">
              Repair completed! 🎉
            </div>
            <div className="from-primary/10 to-primary/5 ml-2 mr-6 rounded-lg bg-gradient-to-br p-3 text-sm backdrop-blur-sm">
              Fixed in 2 hours ⚡️ Great service!
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="relative ml-24 size-[650px] max-lg:hidden">
      <div className="from-background/0 via-background/5 to-background/10 absolute inset-0 bg-gradient-to-b backdrop-blur-[2px]" />
      {cards.map((card, index) => (
        <motion.div
          key={index}
          className="border-primary/10 bg-background/95 absolute left-0 top-0 h-[280px] w-[380px] rounded-2xl border shadow-lg backdrop-blur-xl"
          initial={{ opacity: 0, scale: 0.5, y: 100 }}
          animate={{
            opacity: 1 - index * 0.02,
            scale: card.scale,
            x: card.x + mousePosition.x * (index + 1) * 0.08,
            y: card.y + mousePosition.y * (index + 1) * 0.08,
            rotate: card.rotate,
            zIndex: cards.length - index
          }}
          transition={{
            duration: 1.2,
            delay: index * 0.4,
            type: "spring",
            stiffness: 35,
            damping: 30
          }}
          whileHover={{
            scale: card.scale * 1.015,
            y: card.y - 6,
            zIndex: 10,
            rotate: 0,
            boxShadow: "0 12px 24px -6px rgba(16, 185, 129, 0.1)",
            transition: {
              type: "spring",
              stiffness: 350,
              damping: 25,
              mass: 0.7,
              duration: 0.15
            }
          }}
        >
          <div className="border-primary/10 from-background/95 via-background/90 to-background/80 size-full rounded-xl border bg-gradient-to-br p-7">
            {card.content}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
