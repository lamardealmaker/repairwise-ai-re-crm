"use server"

import { getUserByClerkIdAction } from "@/actions/db/users-actions"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function RedirectPage() {
  try {
    const { userId } = await auth()
    if (!userId) {
      console.log("[Auth Redirect] No userId found, redirecting to login")
      redirect("/login")
    }

    const userResult = await getUserByClerkIdAction(userId)
    if (!userResult.isSuccess || !userResult.data) {
      console.error("[Auth Redirect] User not found in database")
      redirect("/login")
    }

    // Log for debugging
    console.log("[Auth Redirect] User data:", {
      userId,
      role: userResult.data.role
    })

    // Redirect based on role
    if (userResult.data.role === "staff") {
      redirect("/staff/tickets")
    } else {
      redirect("/tenant/tickets")
    }
  } catch (error) {
    console.error("[Auth Redirect] Error:", error)
    redirect("/login")
  }
}
