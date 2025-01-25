/*
<ai_context>
This client component provides the features section for the landing page.
</ai_context>
*/

"use client"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { motion } from "framer-motion"
import {
  AppWindow,
  Database,
  DollarSign,
  LucideIcon,
  Shield,
  Bot,
  Clock,
  ClipboardCheck,
  MessageSquare,
  LineChart
} from "lucide-react"
interface FeatureProps {
  title: string
  description: string
  icon: LucideIcon
}
const features: FeatureProps[] = [
  {
    title: "AI-Powered Triage",
    description:
      "Intelligent system automatically prioritizes and routes maintenance requests for faster response times",
    icon: Bot
  },
  {
    title: "Real-Time Updates",
    description:
      "Keep tenants informed with automated status updates and estimated completion times",
    icon: Clock
  },
  {
    title: "Smart Scheduling",
    description:
      "Efficiently coordinate maintenance staff and contractors with automated scheduling",
    icon: ClipboardCheck
  },
  {
    title: "Instant Communication",
    description:
      "Built-in chat system for seamless communication between tenants, staff, and management",
    icon: MessageSquare
  }
]
const FeatureCard = ({ title, description, icon: Icon }: FeatureProps) => (
  <motion.div
    whileHover={{
      scale: 1.05
    }}
    transition={{
      type: "spring",
      stiffness: 300
    }}
    className="transform-gpu"
    data-oid="2i5hs0d"
  >
    <Card
      className="group transition-shadow duration-200 hover:shadow-lg"
      data-oid="u3e8-wn"
    >
      <CardHeader data-oid="x:2wxqh">
        <Icon className="text-primary mb-2 size-12" data-oid="y50bdsx" />
        <CardTitle data-oid="y5:qi0f">{title}</CardTitle>
        <CardDescription data-oid="sgvq3as">{description}</CardDescription>
      </CardHeader>
    </Card>
  </motion.div>
)
export const FeaturesSection = () => {
  return (
    <section
      className="mt-20 bg-gradient-to-b from-gray-50 to-white py-20 dark:from-gray-800 dark:to-gray-900"
      data-oid="1z41ohj"
    >
      <div className="container mx-auto px-4" data-oid=":gyvpj4">
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut"
          }}
          data-oid="pk54k5m"
        >
          <h2
            className="mb-4 text-center text-4xl font-bold"
            data-oid="49hl4kf"
          >
            Streamline Your Property Maintenance
          </h2>
          <p
            className="text-muted-foreground mb-12 text-center text-xl"
            data-oid="a:wki--"
          >
            Powerful features to make property maintenance effortless
          </p>
          <div
            className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
            data-oid="avtmgqa"
          >
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} data-oid="uaf:hyv" />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
