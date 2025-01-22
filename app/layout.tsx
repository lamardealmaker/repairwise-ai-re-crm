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
import { PostHogPageview } from "@/components/utilities/posthog/posthog-pageview"
import { PostHogUserIdentify } from "@/components/utilities/posthog/posthog-user-identity"
import { Providers } from "@/components/utilities/providers"
import { TailwindIndicator } from "@/components/utilities/tailwind-indicator"
import { cn } from "@/lib/utils"
import { ClerkProvider } from "@clerk/nextjs"
import { auth, currentUser } from "@clerk/nextjs/server"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

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
  const { userId } = await auth()

  if (userId) {
    // Get user data from Clerk
    const user = await currentUser()

    // Check if user exists in our DB
    const userResult = await getUserByClerkIdAction(userId)

    // If user doesn't exist in our DB, create them
    if (!userResult.isSuccess || !userResult.data) {
      if (user) {
        await createUserAction({
          id: userId,
          clerkId: userId,
          email: user.emailAddresses[0]?.emailAddress || "",
          fullName: `${user.firstName} ${user.lastName}`.trim(),
          role: "tenant"
        })
      }
    }

    // Create profile if it doesn't exist (existing logic)
    const profileRes = await getProfileByUserIdAction(userId)
    if (!profileRes.isSuccess) {
      await createProfileAction({ userId })
    }
  }

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "bg-background mx-auto min-h-screen w-full scroll-smooth antialiased",
            inter.className
          )}
        >
          <Providers
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <PostHogUserIdentify />
            <PostHogPageview />

            {children}

            <TailwindIndicator />

            <Toaster />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
