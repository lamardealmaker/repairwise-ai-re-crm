"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Tag, TicketCheck, X } from "lucide-react"
import { Message } from "@/types/chat-types"
import { cn } from "@/lib/utils"

interface ContextSidebarProps {
  messages: Message[]
  isOpen: boolean
  onClose: () => void
  ticketSuggestion: TicketSuggestion | null
  insights: ConversationInsight[]
  onCreateTicket: () => Promise<void>
}

interface TicketSuggestion {
  title: string
  priority: "low" | "medium" | "high"
  category: string
  summary: string
  confidence: number
  relevantMessageIds: string[]
}

interface ConversationInsight {
  type: "issue" | "request" | "feedback"
  content: string
  confidence: number
}

export default function ContextSidebar({
  messages,
  isOpen,
  onClose,
  ticketSuggestion: externalTicketSuggestion,
  insights: externalInsights,
  onCreateTicket
}: ContextSidebarProps) {
  const [localTicketSuggestion, setLocalTicketSuggestion] =
    useState<TicketSuggestion | null>(externalTicketSuggestion)
  const [localInsights, setLocalInsights] =
    useState<ConversationInsight[]>(externalInsights)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Update local state when external props change
  useEffect(() => {
    setLocalTicketSuggestion(externalTicketSuggestion)
    setLocalInsights(externalInsights)
  }, [externalTicketSuggestion, externalInsights])

  // Analyze conversation when messages change
  useEffect(() => {
    if (messages.length > 0) {
      analyzeConversation(messages)
    }
  }, [messages])

  const analyzeConversation = async (messages: Message[]) => {
    setIsAnalyzing(true)
    try {
      // This would be replaced with actual AI analysis
      // For now, using mock analysis for demonstration
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock ticket suggestion based on conversation
      if (messages.length >= 3) {
        const lastThreeMessages = messages.slice(-3)
        const suggestion: TicketSuggestion = {
          title: "Automated Ticket Suggestion",
          priority: "medium",
          category: "Support Request",
          summary: "AI-generated summary of the conversation...",
          confidence: 0.85,
          relevantMessageIds: lastThreeMessages.map(m => m.id)
        }
        setLocalTicketSuggestion(suggestion)

        // Mock insights
        setLocalInsights([
          {
            type: "issue",
            content: "User seems to be experiencing technical difficulties",
            confidence: 0.9
          },
          {
            type: "request",
            content: "Feature enhancement request detected",
            confidence: 0.75
          }
        ])
      }
    } catch (error) {
      console.error("Error analyzing conversation:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const sidebarVariants = {
    open: {
      x: 0,
      width: "400px",
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    closed: {
      x: "100%",
      width: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  }

  const contentVariants = {
    initial: { opacity: 0, x: 20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { delay: 0.2, duration: 0.2 }
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.2 }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={sidebarVariants}
          className="bg-background fixed right-0 top-0 h-full border-l shadow-lg"
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-lg font-semibold">Context & Insights</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="size-8"
                aria-label="Close sidebar"
              >
                <X className="size-4" />
              </Button>
            </div>

            <ScrollArea className="flex-1 p-4">
              <AnimatePresence mode="wait">
                {isAnalyzing ? (
                  <motion.div
                    key="analyzing"
                    variants={contentVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex items-center justify-center py-8"
                  >
                    <div className="text-muted-foreground text-center">
                      <Lightbulb className="mx-auto size-8 animate-pulse" />
                      <p className="mt-2">Analyzing conversation...</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="content"
                    variants={contentVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="space-y-6"
                  >
                    {localTicketSuggestion && (
                      <Card className="p-4">
                        <div className="mb-4 flex items-center justify-between">
                          <h3 className="font-semibold">Ticket Suggestion</h3>
                          <Badge
                            variant="secondary"
                            className={cn(
                              localTicketSuggestion.confidence > 0.8
                                ? "bg-green-100 text-green-800"
                                : localTicketSuggestion.confidence > 0.6
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            )}
                          >
                            {Math.round(localTicketSuggestion.confidence * 100)}
                            % Confidence
                          </Badge>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="text-muted-foreground text-xs">
                              Title
                            </label>
                            <p className="text-sm font-medium">
                              {localTicketSuggestion.title}
                            </p>
                          </div>

                          <div className="flex gap-2">
                            <Badge variant="outline" className="capitalize">
                              {localTicketSuggestion.priority} Priority
                            </Badge>
                            <Badge variant="outline">
                              {localTicketSuggestion.category}
                            </Badge>
                          </div>

                          <div>
                            <label className="text-muted-foreground text-xs">
                              Summary
                            </label>
                            <p className="text-sm">
                              {localTicketSuggestion.summary}
                            </p>
                          </div>

                          <Button
                            className="w-full gap-2"
                            onClick={onCreateTicket}
                          >
                            <TicketCheck className="size-4" />
                            Create Ticket
                          </Button>
                        </div>
                      </Card>
                    )}

                    {localInsights.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="font-semibold">Conversation Insights</h3>
                        {localInsights.map((insight, index) => (
                          <Card key={index} className="p-3">
                            <div className="flex items-start gap-3">
                              <Tag className="text-muted-foreground size-4 shrink-0" />
                              <div className="space-y-1">
                                <Badge variant="outline" className="capitalize">
                                  {insight.type}
                                </Badge>
                                <p className="text-sm">{insight.content}</p>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </ScrollArea>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
