/*
<ai_context>
Contains middleware for protecting routes, checking user authentication, and redirecting as needed.
</ai_context>
*/

import { clerkMiddleware, getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define protected route patterns
const STAFF_ROUTES = ["/staff/(.*)"]
const TENANT_ROUTES = ["/tenant/(.*)"]
const DASHBOARD_ROUTES = ["/dashboard/(.*)"]

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
    pathname === "/signup" ||
    pathname === "/auth/redirect"
  ) {
    return NextResponse.next()
  }

  // Require authentication for protected routes
  if (!userId) {
    if (
      matchesPatterns(pathname, [...STAFF_ROUTES, ...TENANT_ROUTES, ...DASHBOARD_ROUTES])
    ) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
    return NextResponse.next()
  }

  // Get user metadata to check role
  const { getToken } = auth
  const token = await getToken()
  const role = token?.role as string

  // Enforce role-based access
  if (role === "staff" && matchesPatterns(pathname, TENANT_ROUTES)) {
    console.log("[Middleware] Staff user attempting to access tenant route, redirecting to staff dashboard")
    return NextResponse.redirect(new URL("/staff/dashboard", req.url))
  }

  if (role === "tenant" && matchesPatterns(pathname, STAFF_ROUTES)) {
    console.log("[Middleware] Tenant user attempting to access staff route, redirecting to tenant dashboard")
    return NextResponse.redirect(new URL("/tenant/dashboard", req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
}
