import { clerkMiddleware } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { db } from "@/db/db"
import { userRolesTable } from "@/db/schema"
import { eq } from "drizzle-orm"

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()
  const isPublicRoute = !req.nextUrl.pathname.startsWith("/dashboard")

  // Handle authentication
  if (!userId && !isPublicRoute) {
    return Response.redirect(new URL("/sign-in", req.url))
  }

  if (userId) {
    // Check if user is accessing dashboard without an organization
    const isDashboardRoute = req.nextUrl.pathname.startsWith("/dashboard")
    const isCreateOrgRoute = req.nextUrl.pathname === "/dashboard/orgs/create"

    if (isDashboardRoute && !isCreateOrgRoute) {
      // Check if user has any organizations
      const userRoles = await db
        .select()
        .from(userRolesTable)
        .where(eq(userRolesTable.userId, userId))
        .limit(1)

      const hasOrganizations = userRoles.length > 0

      if (!hasOrganizations) {
        return NextResponse.redirect(new URL("/dashboard/orgs/create", req.url))
      }
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
}
