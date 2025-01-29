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

class ContextManager {
  private shortTermMemory: Message[] = []
  private longTermMemory: Map<string, MemoryStore> = new Map()
  private contextKeys: Set<ContextKey> = new Set()

  constructor() {
    this.initializeContextKeys()
  }

  private initializeContextKeys() {
    this.contextKeys = new Set([
      "property_details",
      "maintenance_history",
      "previous_issues",
      "tenant_preferences",
      "important_dates",
      "communication_style"
    ])
  }

  public async updateContext(message: Message): Promise<ConversationContext> {
    this.updateShortTermMemory(message)
    await this.updateLongTermMemory(message)
    return this.buildContext()
  }

  private updateShortTermMemory(message: Message) {
    this.shortTermMemory.push(message)
    if (this.shortTermMemory.length > MEMORY_WINDOW) {
      this.shortTermMemory.shift()
    }
  }

  private async updateLongTermMemory(message: Message) {
    const extractedKeys = await this.extractContextKeys(message)
    for (const [key, value] of extractedKeys) {
      if (!this.longTermMemory.has(key)) {
        this.longTermMemory.set(key, {
          value,
          timestamp: Date.now(),
          importance: 1,
          references: 1
        })
      } else {
        const existing = this.longTermMemory.get(key)!
        this.longTermMemory.set(key, {
          ...existing,
          value: this.mergeValues(existing.value, value),
          timestamp: Date.now(),
          references: existing.references + 1
        })
      }
    }
  }

  private async extractContextKeys(
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
    const preferenceMatch = message.content.match(
      /prefer(?:s|red)? (.+?)[.!?]/i
    )
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

  private mergeValues(existing: string, new_value: string): string {
    // Simple concatenation with deduplication
    const combined = `${existing}; ${new_value}`
    return Array.from(new Set(combined.split("; "))).join("; ")
  }

  private scoreContext(key: string, store: MemoryStore): ContextScore {
    const age = (Date.now() - store.timestamp) / (1000 * 60 * 60) // Age in hours
    return {
      relevance: store.references / Math.max(this.getMaxReferences(), 1),
      recency: Math.exp(-age / 24), // Decay over 24 hours
      importance: store.importance
    }
  }

  private getMaxReferences(): number {
    let max = 0
    for (const store of this.longTermMemory.values()) {
      max = Math.max(max, store.references)
    }
    return max
  }

  private async buildContext(): Promise<ConversationContext> {
    const context: ConversationContext = {
      immediate: this.shortTermMemory,
      relevant: new Map(),
      summary: ""
    }

    // Score and sort long-term memory items
    const scoredItems = Array.from(this.longTermMemory.entries())
      .map(([key, store]) => ({
        key,
        store,
        score: this.scoreContext(key, store)
      }))
      .sort((a, b) => {
        const scoreA =
          (a.score.relevance + a.score.recency) * a.score.importance
        const scoreB =
          (b.score.relevance + b.score.recency) * b.score.importance
        return scoreB - scoreA
      })

    // Add top-scoring items to relevant context
    for (const item of scoredItems) {
      context.relevant.set(item.key as ContextKey, item.store)
    }

    // Generate context summary
    context.summary = this.generateContextSummary(context)

    return context
  }

  private generateContextSummary(context: ConversationContext): string {
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

  public getRelevantContext(): Map<ContextKey, MemoryStore> {
    return new Map(this.longTermMemory)
  }

  public clearContext() {
    this.shortTermMemory = []
    this.longTermMemory.clear()
  }
}

export const contextManager = new ContextManager()
