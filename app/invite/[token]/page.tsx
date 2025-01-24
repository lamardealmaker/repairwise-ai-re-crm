"use server"

import {
  acceptInviteAction,
  getInviteByTokenAction
} from "@/actions/db/invites-actions"
import { SignInButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { getUserByClerkIdAction } from "@/actions/db/users-actions"

interface InvitePageProps {
  params: {
    token: string
  }
}

export default async function InvitePage({ params }: InvitePageProps) {
  const authData = await auth()
  const userId = authData.userId
  const { data: invite } = await getInviteByTokenAction(params.token)

  if (!invite) {
    return (
      <div className="container mx-auto py-6">
        <div className="mx-auto max-w-md space-y-4 text-center">
          <h1 className="text-2xl font-bold">Invalid Invite</h1>
          <p className="text-muted-foreground">
            This invite link is invalid or has expired.
          </p>
        </div>
      </div>
    )
  }

  // If user is not logged in, show sign in button
  if (!userId) {
    return (
      <div className="container mx-auto py-6">
        <div className="mx-auto max-w-md space-y-4 text-center">
          <h1 className="text-2xl font-bold">Accept Invite</h1>
          <p className="text-muted-foreground">
            Sign in or create an account to accept this invite.
          </p>
          <SignInButton mode="modal">
            <button className="bg-primary text-primary-foreground rounded-lg px-4 py-2">
              Sign In
            </button>
          </SignInButton>
        </div>
      </div>
    )
  }

  // Get user's base role to determine redirect
  const userResult = await getUserByClerkIdAction(userId)
  if (!userResult.isSuccess || !userResult.data) {
    return (
      <div className="container mx-auto py-6">
        <div className="mx-auto max-w-md space-y-4 text-center">
          <h1 className="text-2xl font-bold">Error</h1>
          <p className="text-muted-foreground">User not found</p>
        </div>
      </div>
    )
  }

  // If invite is already accepted, redirect to appropriate dashboard
  if (invite.status === "ACCEPTED") {
    if (userResult.data.role === "tenant") {
      redirect("/tenant/tickets")
    } else {
      redirect("/staff/tickets")
    }
    return
  }

  // If invite is not pending, show status
  if (invite.status !== "PENDING") {
    return (
      <div className="container mx-auto py-6">
        <div className="mx-auto max-w-md space-y-4 text-center">
          <h1 className="text-2xl font-bold">
            Invite {invite.status.toLowerCase()}
          </h1>
          <p className="text-muted-foreground">
            This invite has already been {invite.status.toLowerCase()}.
          </p>
        </div>
      </div>
    )
  }

  // If user is logged in and invite is pending, accept the invite
  const result = await acceptInviteAction(params.token)

  if (!result.isSuccess) {
    return (
      <div className="container mx-auto py-6">
        <div className="mx-auto max-w-md space-y-4 text-center">
          <h1 className="text-2xl font-bold">Error</h1>
          <p className="text-muted-foreground">{result.message}</p>
        </div>
      </div>
    )
  }

  // Redirect based on user's base role after accepting invite
  if (userResult.data.role === "tenant") {
    redirect("/tenant/tickets")
  } else {
    redirect("/staff/tickets")
  }
}
