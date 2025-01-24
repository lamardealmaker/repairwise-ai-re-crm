import { SelectOrganization } from "@/db/schema"
import { OrgRole } from "./roles-types"

export interface Organization extends SelectOrganization {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateOrganizationInput {
  name: string
  role: OrgRole
}

export interface UpdateOrganizationInput
  extends Partial<CreateOrganizationInput> {
  id: string
}
