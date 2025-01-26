/*
<ai_context>
This client component provides the hero section for the landing page.
</ai_context>
*/

"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Building2, User } from "lucide-react"
import Link from "next/link"
import { FloatingCards } from "./floating-cards"
import { Nav } from "./nav"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export const HeroSection = () => {
  return (
    <>
      <Nav />
      <div className="relative mx-auto flex min-h-screen max-w-7xl items-start justify-between px-16 pt-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex w-[45%] flex-col items-start gap-8"
        >
          <motion.h1
            variants={itemVariants}
            className="text-primary text-left text-5xl font-medium tracking-tight sm:text-6xl lg:text-7xl"
          >
            AI-Powered Property Maintenance Made Simple
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-muted-foreground text-left text-lg sm:text-xl"
          >
            Boost tenant satisfaction with lightning-fast response times and
            seamless maintenance handling. Our AI-powered system automates
            request processing, coordinates repairs efficiently, and ensures
            top-tier service delivery—keeping your tenants happy and your
            properties well-maintained.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4"
          >
            <Button
              size="lg"
              asChild
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              <Link href="/staff/login">
                <Building2 className="mr-2 size-5" />
                Staff Login
              </Link>
            </Button>
            <Button
              size="lg"
              asChild
              variant="outline"
              className="border-secondary/20 hover:bg-secondary/5"
            >
              <Link href="/tenant/login">
                <User className="mr-2 size-5" />
                Tenant Login
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <div className="w-[55%]">
          <FloatingCards />
        </div>
      </div>
    </>
  )
}
