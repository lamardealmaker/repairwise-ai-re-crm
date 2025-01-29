"use server"

import { Message } from "@/types/chat-types"
import { ConversationContext, ContextKey, MemoryStore } from "@/types/ai-types"

const MEMORY_WINDOW = 10 // Number of messages to keep in immediate context
const MAX_TOKENS = 4000 // Max tokens for context window

interface ContextScore {
  relevance: number
  recency: number
  importance: number
}

// In-memory storage (this will be replaced with Redis/DB in production)
let shortTermMemory: Message[] = []
let longTermMemory: Map<string, MemoryStore> = new Map()
const contextKeys: Set<ContextKey> = new Set([
  "property_details",
  "maintenance_history",
  "previous_issues",
  "tenant_preferences",
  "important_dates",
  "communication_style"
])

function updateShortTermMemory(message: Message) {
  shortTermMemory.push(message)
  if (shortTermMemory.length > MEMORY_WINDOW) {
    shortTermMemory.shift()
  }
}

async function extractContextKeys(
  message: Message
): Promise<Map<string, string>> {
  const extracted = new Map<string, string>()

  // Extract property details
  const propertyMatch = message.content.match(
    /(?:property|unit|apartment|house) (?:number|#)?\s*([A-Z0-9-]+)/i
  )
  if (propertyMatch) {
    extracted.set("property_details", propertyMatch[1])
  }

  // Extract maintenance history
  const maintenanceMatch = message.content.match(
    /previous(?:ly)? (?:had|reported|fixed) (.+?)[.!?]/i
  )
  if (maintenanceMatch) {
    extracted.set("maintenance_history", maintenanceMatch[1])
  }

  // Extract preferences
  const preferenceMatch = message.content.match(/prefer(?:s|red)? (.+?)[.!?]/i)
  if (preferenceMatch) {
    extracted.set("tenant_preferences", preferenceMatch[1])
  }

  // Extract dates
  const dateMatch = message.content.match(
    /(?:on|by|before|after) ((?:\d{1,2}\/\d{1,2}\/\d{4})|(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}(?:st|nd|rd|th)?(?:,\s+\d{4})?)/i
  )
  if (dateMatch) {
    extracted.set("important_dates", dateMatch[1])
  }

  return extracted
}

function mergeValues(existing: string, new_value: string): string {
  // Simple concatenation with deduplication
  const combined = `${existing}; ${new_value}`
  return Array.from(new Set(combined.split("; "))).join("; ")
}

async function updateLongTermMemory(message: Message) {
  const extractedKeys = await extractContextKeys(message)
  for (const [key, value] of extractedKeys) {
    if (!longTermMemory.has(key)) {
      longTermMemory.set(key, {
        value,
        timestamp: Date.now(),
        importance: 1,
        references: 1
      })
    } else {
      const existing = longTermMemory.get(key)!
      longTermMemory.set(key, {
        ...existing,
        value: mergeValues(existing.value, value),
        timestamp: Date.now(),
        references: existing.references + 1
      })
    }
  }
}

function scoreContext(key: string, store: MemoryStore): ContextScore {
  const age = (Date.now() - store.timestamp) / (1000 * 60 * 60) // Age in hours
  const maxReferences = Math.max(
    ...Array.from(longTermMemory.values()).map(s => s.references),
    1
  )
  return {
    relevance: store.references / maxReferences,
    recency: Math.exp(-age / 24), // Decay over 24 hours
    importance: store.importance
  }
}

function generateContextSummary(context: ConversationContext): string {
  const summaryParts: string[] = []

  // Add property details if available
  const propertyDetails = context.relevant.get("property_details")
  if (propertyDetails) {
    summaryParts.push(`Property: ${propertyDetails.value}`)
  }

  // Add maintenance history if available
  const maintenanceHistory = context.relevant.get("maintenance_history")
  if (maintenanceHistory) {
    summaryParts.push(`History: ${maintenanceHistory.value}`)
  }

  // Add preferences if available
  const preferences = context.relevant.get("tenant_preferences")
  if (preferences) {
    summaryParts.push(`Preferences: ${preferences.value}`)
  }

  // Add important dates if available
  const dates = context.relevant.get("important_dates")
  if (dates) {
    summaryParts.push(`Dates: ${dates.value}`)
  }

  return summaryParts.join(" | ")
}

export async function updateContextAction(
  message: Message
): Promise<ConversationContext> {
  updateShortTermMemory(message)
  await updateLongTermMemory(message)

  const context: ConversationContext = {
    immediate: shortTermMemory,
    relevant: new Map(),
    summary: ""
  }

  // Score and sort long-term memory items
  const scoredItems = Array.from(longTermMemory.entries())
    .map(([key, store]) => ({
      key: key as ContextKey,
      store,
      score: scoreContext(key, store)
    }))
    .sort((a, b) => {
      const scoreA = (a.score.relevance + a.score.recency) * a.score.importance
      const scoreB = (b.score.relevance + b.score.recency) * b.score.importance
      return scoreB - scoreA
    })

  // Add top-scoring items to relevant context
  for (const item of scoredItems) {
    context.relevant.set(item.key, item.store)
  }

  // Generate context summary
  context.summary = generateContextSummary(context)

  return context
}

export async function getRelevantContextAction(): Promise<
  Map<ContextKey, MemoryStore>
> {
  return new Map(
    Array.from(longTermMemory.entries()).map(([key, value]) => [
      key as ContextKey,
      value
    ])
  )
}

export async function clearContextAction(): Promise<void> {
  shortTermMemory = []
  longTermMemory.clear()
}
