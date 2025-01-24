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

export interface CreateInviteInput {
  email: string
  orgId: string
  propertyId?: string
  role: OrgRole
  expiresInDays?: number // Optional, defaults to 7 in the action
}

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
