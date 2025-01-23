/*
<ai_context>
This client page provides the login form from Clerk.
</ai_context>
*/

"use client"

import { SignIn } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { useTheme } from "next-themes"

type Props = {
  params: { login: string[] }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function LoginPage({ params, searchParams }: Props) {
  const { theme } = useTheme()

  return (
    <SignIn
      afterSignInUrl="/auth/redirect"
      appearance={{ baseTheme: theme === "dark" ? dark : undefined }}
    />
  )
}
