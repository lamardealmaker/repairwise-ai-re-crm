import { SelectUserRole } from "@/db/schema"

export type OrgRole = "ADMIN" | "EMPLOYEE" | "MAINTENANCE" | "TENANT"

export interface UserRole extends SelectUserRole {
  id: string
  userId: string
  orgId: string
  propertyId: string | null
  role: OrgRole
  createdAt: Date
}

export interface CreateUserRoleInput {
  userId: string
  orgId: string
  propertyId?: string
  role: OrgRole
}

export interface UpdateUserRoleInput
  extends Partial<Omit<CreateUserRoleInput, "userId" | "orgId">> {
  id: string
}

export interface UserRoleWithDetails extends UserRole {
  organization?: {
    id: string
    name: string
  }
  property?: {
    id: string
    name: string
  } | null
  user?: {
    id: string
    email: string
    fullName: string | null
    role: "tenant" | "staff"
  } | null
}
