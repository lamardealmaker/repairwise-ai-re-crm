"use client"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/utilities/mode-toggle"
import Link from "next/link"
import { motion } from "framer-motion"
import { Building } from "lucide-react"

export const Nav = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-background/80 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-sm"
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-semibold"
        >
          <Building className="size-6" />
          RepairWise
        </Link>

        <div className="hidden items-center gap-6 sm:flex">
          <Link
            href="#about"
            className="text-muted-foreground hover:text-foreground"
          >
            About
          </Link>
          <Link
            href="#pricing"
            className="text-muted-foreground hover:text-foreground"
          >
            Pricing
          </Link>
          <Link
            href="#contact"
            className="text-muted-foreground hover:text-foreground"
          >
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button asChild variant="outline" size="sm">
            <Link href="/tenant/login">Login</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/staff/login">Sign Up</Link>
          </Button>
        </div>
      </nav>
    </motion.header>
  )
}
