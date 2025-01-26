/*
<ai_context>
Contains middleware for protecting routes, checking user authentication, and redirecting as needed.
</ai_context>
*/

import { clerkMiddleware } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define protected route patterns
const STAFF_ROUTES = ["/staff/(.*)"]
const TENANT_ROUTES = ["/tenant/(.*)"]

// Helper to check if URL matches any patterns
const matchesPatterns = (url: string, patterns: string[]) =>
  patterns.some(pattern => new RegExp(`^${pattern}$`).test(url))

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId } = await auth()
  const pathname = req.nextUrl.pathname

  // Public routes are accessible to everyone
  if (
    pathname.includes("_next") ||
    pathname.includes("assets") ||
    pathname.includes("api") ||
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/staff/login" ||
    pathname === "/tenant/login" ||
    pathname === "/signup" ||
    pathname === "/auth/redirect"
  ) {
    return NextResponse.next()
  }

  // Require authentication for protected routes
  if (!userId) {
    if (matchesPatterns(pathname, STAFF_ROUTES)) {
      return NextResponse.redirect(new URL("/staff/login", req.url))
    }
    if (matchesPatterns(pathname, TENANT_ROUTES)) {
      return NextResponse.redirect(new URL("/tenant/login", req.url))
    }
    return NextResponse.next()
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
}
