/*
<ai_context>
This client page provides the signup form from Clerk.
</ai_context>
*/

"use client"

import { SignUp } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { useTheme } from "next-themes"

type Props = {
  params: { signup: string[] }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function SignUpPage({ params, searchParams }: Props) {
  const { theme } = useTheme()

  return (
    <SignUp
      forceRedirectUrl="/tenant/tickets"
      appearance={{ baseTheme: theme === "dark" ? dark : undefined }}
    />
  )
}
