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
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
    className="transform-gpu"
  >
    <Card className="group transition-shadow duration-200 hover:shadow-lg">
      <CardHeader>
        <Icon className="text-primary mb-2 size-12" />
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  </motion.div>
)

export const FeaturesSection = () => {
  return (
    <section className="mt-20 bg-gradient-to-b from-gray-50 to-white py-20 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="mb-4 text-center text-4xl font-bold">
            Streamline Your Property Maintenance
          </h2>
          <p className="text-muted-foreground mb-12 text-center text-xl">
            Powerful features to make property maintenance effortless
          </p>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
