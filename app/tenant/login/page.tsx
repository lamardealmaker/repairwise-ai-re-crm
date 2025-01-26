"use server"

import { SignIn } from "@clerk/nextjs"

export default function TenantLoginPage() {
  return (
    <div className="container flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Tenant Login</h1>
          <p className="text-muted-foreground mt-2">
            Login to access your tenant portal
          </p>
        </div>
        <SignIn
          afterSignInUrl="/tenant/tickets"
          redirectUrl="/tenant/tickets"
        />
      </div>
    </div>
  )
}
