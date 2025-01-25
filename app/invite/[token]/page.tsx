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
      <div className="container mx-auto py-6" data-oid="_sez.34">
        <div
          className="mx-auto max-w-md space-y-4 text-center"
          data-oid="w3dm4dv"
        >
          <h1 className="text-2xl font-bold" data-oid="ykzpjoh">
            Invalid Invite
          </h1>
          <p className="text-muted-foreground" data-oid="apj3n2o">
            This invite link is invalid or has expired.
          </p>
        </div>
      </div>
    )
  }

  // If user is not logged in, show sign in button
  if (!userId) {
    return (
      <div className="container mx-auto py-6" data-oid=":pseg2j">
        <div
          className="mx-auto max-w-md space-y-4 text-center"
          data-oid=":1vn--4"
        >
          <h1 className="text-2xl font-bold" data-oid="l2z4lwb">
            Accept Invite
          </h1>
          <p className="text-muted-foreground" data-oid="h-4cx5g">
            Sign in or create an account to accept this invite.
          </p>
          <SignInButton mode="modal" data-oid="d1kiwv3">
            <button
              className="bg-primary text-primary-foreground rounded-lg px-4 py-2"
              data-oid="dpkcrgq"
            >
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
      <div className="container mx-auto py-6" data-oid="k7wyp07">
        <div
          className="mx-auto max-w-md space-y-4 text-center"
          data-oid="-o.etyi"
        >
          <h1 className="text-2xl font-bold" data-oid="mshvz05">
            Error
          </h1>
          <p className="text-muted-foreground" data-oid="pvggh7:">
            User not found
          </p>
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
      <div className="container mx-auto py-6" data-oid="wncekz:">
        <div
          className="mx-auto max-w-md space-y-4 text-center"
          data-oid=".w2zmxu"
        >
          <h1 className="text-2xl font-bold" data-oid="wme8xld">
            Invite {invite.status.toLowerCase()}
          </h1>
          <p className="text-muted-foreground" data-oid="0i8ejkn">
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
      <div className="container mx-auto py-6" data-oid="_qx:cmn">
        <div
          className="mx-auto max-w-md space-y-4 text-center"
          data-oid="h9l_deg"
        >
          <h1 className="text-2xl font-bold" data-oid="oips9me">
            Error
          </h1>
          <p className="text-muted-foreground" data-oid="eg84qod">
            {result.message}
          </p>
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
