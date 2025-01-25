/*
<ai_context>
This client component provides the hero section for the landing page.
</ai_context>
*/

"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Rocket } from "lucide-react"
import Link from "next/link"
export const HeroSection = () => {
  return (
    <div
      className="flex flex-col items-center justify-center px-8 pt-32 text-center"
      data-oid="gu6ew2_"
    >
      <motion.div
        initial={{
          opacity: 0,
          y: -20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut"
        }}
        className="max-w-4xl space-y-4"
        data-oid="96-rd30"
      >
        <h1
          className="text-primary text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl"
          data-oid="pe65omt"
        >
          AI-Powered Property Maintenance Made Simple
        </h1>

        <p
          className="text-muted-foreground mx-auto max-w-2xl text-lg"
          data-oid="2-ew0a_"
        >
          RepairWise AI streamlines your apartment maintenance with intelligent
          request handling, automated responses, and efficient repair
          management.
        </p>

        <div
          className="flex flex-wrap items-center justify-center gap-4 pt-8"
          data-oid="d7166cn"
        >
          <Button
            size="lg"
            asChild
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            data-oid="l:jv0bv"
          >
            <Link href="/signup" data-oid="t942730">
              <Rocket className="mr-2 size-5" data-oid="9f5wklu" />
              Start Managing Smarter
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
