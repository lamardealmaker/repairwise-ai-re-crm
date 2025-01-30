import { Message } from "@/types/chat-types"
import { ContextWindow, ContextItem } from "@/types/ai-types"

export interface SerializedContextWindow {
  shortTerm: string
  longTerm: string
  metadata: Record<string, any>
  summary: string
}

// Type guard to check if context is serialized
export function isSerializedContext(
  context: any
): context is SerializedContextWindow {
  return (
    typeof context === "object" &&
    typeof context.shortTerm === "string" &&
    typeof context.longTerm === "string" &&
    typeof context.metadata === "object" &&
    typeof context.summary === "string"
  )
}

// Validate and clean message object for serialization
function sanitizeMessage(message: Message): Message {
  return {
    id: message.id,
    sessionId: message.sessionId,
    content: message.content,
    role: message.role,
    createdAt: message.createdAt,
    updatedAt: message.updatedAt,
    metadata: message.metadata
      ? JSON.parse(JSON.stringify(message.metadata))
      : undefined,
    parentId: message.parentId,
    attachments: message.attachments
      ? message.attachments.map(att => ({
          id: att.id,
          name: att.name,
          url: att.url,
          type: att.type
        }))
      : undefined
  }
}

// Serialize context window for storage/transmission
export function serializeContext(
  context: ContextWindow
): SerializedContextWindow {
  try {
    return {
      shortTerm: JSON.stringify(context.shortTerm.map(sanitizeMessage)),
      longTerm: JSON.stringify(context.longTerm),
      metadata: context.metadata,
      summary: context.summary
    }
  } catch (error) {
    console.error("Error serializing context:", error)
    throw new Error("Failed to serialize context")
  }
}

// Deserialize context window from storage/transmission
export function deserializeContext(
  serialized: SerializedContextWindow
): ContextWindow {
  try {
    return {
      shortTerm: JSON.parse(serialized.shortTerm) as Message[],
      longTerm: JSON.parse(serialized.longTerm) as ContextItem[],
      metadata: serialized.metadata,
      summary: serialized.summary
    }
  } catch (error) {
    console.error("Error deserializing context:", error)
    throw new Error("Failed to deserialize context")
  }
}

// Migrate legacy context to serialized format
export function migrateContext(
  context: Partial<ContextWindow>
): SerializedContextWindow {
  try {
    const defaultContext: ContextWindow = {
      shortTerm: [],
      longTerm: [],
      metadata: {},
      summary: ""
    }

    const fullContext: ContextWindow = {
      ...defaultContext,
      ...context
    }

    return serializeContext(fullContext)
  } catch (error) {
    console.error("Error migrating context:", error)
    throw new Error("Failed to migrate context")
  }
}

// Validate context data
export function validateContext(context: ContextWindow): boolean {
  try {
    // Validate shortTerm messages
    if (!Array.isArray(context.shortTerm)) return false
    for (const message of context.shortTerm) {
      if (
        typeof message !== "object" ||
        typeof message.id !== "string" ||
        typeof message.sessionId !== "string" ||
        typeof message.content !== "string" ||
        !["user", "assistant", "system"].includes(message.role)
      ) {
        return false
      }
    }

    // Validate longTerm items
    if (!Array.isArray(context.longTerm)) return false
    for (const item of context.longTerm) {
      if (
        typeof item !== "object" ||
        typeof item.key !== "string" ||
        typeof item.value !== "string" ||
        typeof item.metadata !== "object"
      ) {
        return false
      }
    }

    // Validate metadata and summary
    if (typeof context.metadata !== "object") return false
    if (typeof context.summary !== "string") return false

    return true
  } catch {
    return false
  }
}
