import { NextResponse } from "next/server"
import { testContextManagerAction } from "@/actions/test-actions"

export async function POST() {
  const result = await testContextManagerAction()
  return NextResponse.json(result)
}
