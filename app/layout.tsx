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
import { auth, currentUser, clerkClient } from "@clerk/nextjs/server"
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

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  try {
    const { userId } = await auth()
    if (userId) {
      // Get user data from Clerk
      const user = await currentUser()
      const clerk = await clerkClient()

      // Check if user exists in our DB
      const userResult = await getUserByClerkIdAction(userId)

      // Check for pending invites for this email
      let pendingInvite = null
      if (user?.emailAddresses[0]?.emailAddress) {
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
        if (user) {
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

          // Sync role to Clerk metadata
          if (newUser.isSuccess) {
            await clerk.users.updateUser(userId, {
              publicMetadata: {
                role: pendingInvite
                  ? pendingInvite.role === "TENANT"
                    ? "tenant"
                    : "staff"
                  : "staff"
              }
            })

            // If this was an invited user, create their organization role
            if (pendingInvite) {
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
        }
      } else {
        // Sync existing user's role to Clerk metadata
        await clerk.users.updateUser(userId, {
          publicMetadata: {
            role: userResult.data.role
          }
        })
      }

      // Create profile if it doesn't exist
      const profileRes = await getProfileByUserIdAction(userId)
      if (!profileRes.isSuccess) {
        await createProfileAction({
          userId
        })
      }
    }
  } catch (error) {
    console.error("Error in root layout:", error)
  }

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
