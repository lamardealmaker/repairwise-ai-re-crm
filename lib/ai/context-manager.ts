"use server"

import { Message } from "@/types/chat-types"
import {
  ConversationContext,
  ContextKey,
  ContextScore,
  ContextItem,
  ContextWindow,
  ContextMetadata
} from "@/types/ai-types"

const MEMORY_WINDOW = 10 // Number of messages to keep in immediate context
const MAX_TOKENS = 4000 // Max tokens for context window
const CONTEXT_TTL = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

// Enhanced context keys with metadata
const CONTEXT_KEYS: Record<ContextKey, { importance: number }> = {
  property_details: { importance: 1.0 },
  maintenance_history: { importance: 0.9 },
  previous_issues: { importance: 0.8 },
  tenant_preferences: { importance: 0.7 },
  important_dates: { importance: 0.6 },
  communication_style: { importance: 0.5 }
}

// In-memory storage (this will be replaced with Redis/DB in production)
let contextWindow: ContextWindow = {
  shortTerm: [],
  longTerm: [],
  metadata: {},
  summary: ""
}

function calculateContextScore(item: ContextItem): ContextScore {
  const age = (Date.now() - item.metadata.timestamp) / CONTEXT_TTL
  const baseImportance = CONTEXT_KEYS[item.key]?.importance ?? 0.5

  return {
    relevance: baseImportance,
    recency: Math.exp(-age), // Exponential decay based on age
    importance: baseImportance
  }
}

function updateShortTermMemory(message: Message) {
  contextWindow.shortTerm.push(message)
  if (contextWindow.shortTerm.length > MEMORY_WINDOW) {
    contextWindow.shortTerm.shift()
  }
}

async function extractContextKeys(message: Message): Promise<ContextItem[]> {
  const items: ContextItem[] = []
  const timestamp = Date.now()

  // Extract property details
  const propertyMatch = message.content.match(
    /(?:property|unit|apartment|house) (?:number|#)?\s*([A-Z0-9-]+)/i
  )
  if (propertyMatch) {
    items.push({
      key: "property_details",
      value: propertyMatch[1],
      metadata: {
        source: "message",
        timestamp,
        expiresAt: timestamp + CONTEXT_TTL
      }
    })
  }

  // Extract maintenance history
  const maintenanceMatch = message.content.match(
    /previous(?:ly)? (?:had|reported|fixed) (.+?)[.!?]/i
  )
  if (maintenanceMatch) {
    items.push({
      key: "maintenance_history",
      value: maintenanceMatch[1],
      metadata: {
        source: "message",
        timestamp,
        expiresAt: timestamp + CONTEXT_TTL
      }
    })
  }

  // Add more extractors as needed...

  return items
}

async function updateLongTermMemory(message: Message) {
  const newItems = await extractContextKeys(message)

  for (const item of newItems) {
    // Find existing item with same key
    const existingIndex = contextWindow.longTerm.findIndex(
      i => i.key === item.key
    )

    if (existingIndex >= 0) {
      // Update existing item
      const existing = contextWindow.longTerm[existingIndex]
      contextWindow.longTerm[existingIndex] = {
        ...item,
        value: `${existing.value}; ${item.value}`, // Merge values
        metadata: {
          ...item.metadata,
          source: `${existing.metadata.source}, message` // Track sources
        }
      }
    } else {
      // Add new item
      contextWindow.longTerm.push(item)
    }
  }

  // Cleanup expired items
  contextWindow.longTerm = contextWindow.longTerm.filter(
    item => !item.metadata.expiresAt || item.metadata.expiresAt > Date.now()
  )
}

function generateContextSummary(): string {
  const summaryParts: string[] = []

  // Sort items by score
  const scoredItems = contextWindow.longTerm
    .map(item => ({
      ...item,
      score: calculateContextScore(item)
    }))
    .sort((a, b) => {
      const scoreA = (a.score.relevance + a.score.recency) * a.score.importance
      const scoreB = (b.score.relevance + b.score.recency) * b.score.importance
      return scoreB - scoreA
    })

  // Generate summary from top items
  for (const item of scoredItems) {
    summaryParts.push(`${item.key}: ${item.value}`)
  }

  return summaryParts.join(" | ")
}

export async function updateContextAction(
  message: Message
): Promise<ContextWindow> {
  // Update memories
  updateShortTermMemory(message)
  await updateLongTermMemory(message)

  // Update summary
  contextWindow.summary = generateContextSummary()

  return contextWindow
}

export async function getContextAction(): Promise<ContextWindow> {
  return contextWindow
}

export async function clearContextAction(): Promise<void> {
  contextWindow = {
    shortTerm: [],
    longTerm: [],
    metadata: {},
    summary: ""
  }
}
