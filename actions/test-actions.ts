"use server"

import { testContextManager } from "@/lib/ai/test-context"
import { ActionState } from "@/types"
import { ContextWindow } from "@/types/ai-types"

export async function testContextManagerAction(): Promise<ActionState<ContextWindow>> {
  try {
    const result = await testContextManager()
    return {
      isSuccess: true,
      message: "Context manager test completed successfully",
      data: result
    }
  } catch (error) {
    console.error("Error testing context manager:", error)
    return {
      isSuccess: false,
      message: error instanceof Error ? error.message : "Failed to test context manager"
    }
  }
} 