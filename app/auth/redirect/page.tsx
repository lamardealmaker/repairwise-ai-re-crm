"use server"

import { getUserByClerkIdAction } from "@/actions/db/users-actions"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function RedirectPage() {
  const { userId } = await auth()
  if (!userId) {
    redirect("/login")
  }

  const userResult = await getUserByClerkIdAction(userId)

  console.log("[Auth Redirect]", {
    userId,
    role: userResult.data?.role,
    success: userResult.isSuccess
  })

  if (userResult.isSuccess && userResult.data?.role === "staff") {
    redirect("/staff/tickets")
  } else {
    redirect("/tenant/tickets")
  }
}
