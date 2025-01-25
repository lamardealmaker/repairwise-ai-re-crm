"use server"

import { getUserByClerkIdAction } from "@/actions/db/users-actions"
import { auth, clerkClient } from "@clerk/nextjs/server"
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

    // Sync role with Clerk metadata
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: userResult.data.role
      }
    })

    console.log("[Auth Redirect] User role:", userResult.data.role)

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
