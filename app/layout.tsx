/*
<ai_context>
The root server layout for the app.
</ai_context>
*/

import {
  createProfileAction,
  getProfileByUserIdAction
} from "@/actions/db/profiles-actions"
import {
  createUserAction,
  getUserByClerkIdAction
} from "@/actions/db/users-actions"
import { Toaster } from "@/components/ui/toaster"
import { Providers } from "@/components/utilities/providers"
import { TailwindIndicator } from "@/components/utilities/tailwind-indicator"
import { cn } from "@/lib/utils"
import { ClerkProvider } from "@clerk/nextjs"
import { auth, currentUser } from "@clerk/nextjs/server"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { db } from "@/db/db"
import { invitesTable, userRolesTable } from "@/db/schema"
import { and, eq } from "drizzle-orm"

const inter = Inter({
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "RepairWise AI | Smart Apartment Maintenance Management",
  description:
    "AI-powered apartment maintenance and repair management system. Streamline tenant requests, automate responses, and manage repairs efficiently."
}

async function initUser() {
  try {
    const { userId } = await auth()
    if (!userId) return

    // Get user data from Clerk
    const user = await currentUser()
    if (!user) {
      console.error("No user found in Clerk")
      return
    }

    // Check if user exists in our DB
    const userResult = await getUserByClerkIdAction(userId)

    // Check for pending invites for this email
    let pendingInvite = null
    if (user.emailAddresses[0]?.emailAddress) {
      const inviteResult = await db
        .select()
        .from(invitesTable)
        .where(
          and(
            eq(invitesTable.email, user.emailAddresses[0].emailAddress),
            eq(invitesTable.status, "PENDING")
          )
        )
        .limit(1)
      if (inviteResult.length > 0) {
        pendingInvite = inviteResult[0]
      }
    }

    // If user doesn't exist in our DB, create them
    if (!userResult.isSuccess || !userResult.data) {
      const email = user.emailAddresses[0]?.emailAddress || ""
      const fullName = `${user.firstName} ${user.lastName}`.trim()

      // Create the user
      const newUser = await createUserAction({
        id: userId,
        clerkId: userId,
        email,
        fullName,
        // If no invite exists, they're staff. If invited, base role depends on invite role
        role: pendingInvite
          ? pendingInvite.role === "TENANT"
            ? "tenant"
            : "staff"
          : "staff"
      })

      // If this was an invited user, create their organization role
      if (newUser.isSuccess && pendingInvite) {
        await db.insert(userRolesTable).values({
          userId,
          orgId: pendingInvite.orgId,
          propertyId: pendingInvite.propertyId,
          role: pendingInvite.role
        })

        // Update invite status
        await db
          .update(invitesTable)
          .set({
            status: "ACCEPTED"
          })
          .where(eq(invitesTable.id, pendingInvite.id))
      }
    }

    // Create profile if it doesn't exist
    const profileRes = await getProfileByUserIdAction(userId)
    if (!profileRes.isSuccess) {
      await createProfileAction({
        userId
      })
    }
  } catch (error) {
    console.error("Error in initUser:", error)
  }
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  await initUser()

  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            "bg-background mx-auto min-h-screen w-full scroll-smooth antialiased",
            inter.className
          )}
        >
          <Providers>
            {children}
            <TailwindIndicator />
            <Toaster />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
