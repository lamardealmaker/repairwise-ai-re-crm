import { OpenAI } from "openai"
import { wrapOpenAI } from "langsmith/wrappers"
import { traceable } from "langsmith/traceable"

// Initialize the OpenAI client with LangSmith tracing
export const openai = wrapOpenAI(
  new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })
)

// Helper to generate a unique run ID for feedback
export const generateRunId = () => crypto.randomUUID()

// Helper to create feedback for a run
export async function createFeedback(runId: string, score: number) {
  const { Client } = await import("langsmith")
  const client = new Client()

  return client.createFeedback(runId, "user-score", { score })
}

// Decorator for tracing functions
export function withTracing<T extends (...args: any[]) => any>(
  fn: T,
  options?: {
    name?: string
    metadata?: Record<string, any>
    runType?: string
  }
) {
  return traceable(fn, {
    name: options?.name || fn.name,
    metadata: options?.metadata,
    run_type: options?.runType
  })
}
