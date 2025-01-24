import { SelectInvite } from "@/db/schema"
import { OrgRole } from "./roles-types"

export type InviteStatus = "PENDING" | "ACCEPTED" | "EXPIRED" | "CANCELED"

export interface Invite extends SelectInvite {
  id: string
  email: string
  orgId: string
  propertyId: string | null
  role: OrgRole
  token: string
  status: InviteStatus
  expiresAt: Date
  invitedByUserId: string
  createdAt: Date
}

// Base invite input without role-specific requirements
interface BaseInviteInput {
  email: string
  orgId: string
  expiresInDays?: number
}

// Tenant invite requires propertyId
interface TenantInviteInput extends BaseInviteInput {
  role: "TENANT"
  propertyId: string
}

// Other roles make propertyId optional
interface OtherRoleInviteInput extends BaseInviteInput {
  role: Exclude<OrgRole, "TENANT">
  propertyId?: string
}

// Union type for all invite inputs
export type CreateInviteInput = TenantInviteInput | OtherRoleInviteInput

export interface UpdateInviteInput {
  id: string
  status: InviteStatus
}

export interface InviteWithDetails extends Invite {
  organization: {
    id: string
    name: string
  }
  property?: {
    id: string
    name: string
  } | null
  invitedBy: {
    id: string
    fullName: string | null
    email: string
  }
}
