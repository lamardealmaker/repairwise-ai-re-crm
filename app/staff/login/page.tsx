"use server"

import { SignIn } from "@clerk/nextjs"

export default function StaffLoginPage() {
  return (
    <div className="container flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Staff Login</h1>
          <p className="text-muted-foreground mt-2">
            Login to access the staff dashboard
          </p>
        </div>
        <SignIn afterSignInUrl="/staff/tickets" redirectUrl="/staff/tickets" />
      </div>
    </div>
  )
}
