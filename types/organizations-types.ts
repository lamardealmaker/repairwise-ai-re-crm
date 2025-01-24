import { SelectOrganization } from "@/db/schema"

export interface Organization extends SelectOrganization {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateOrganizationInput {
  name: string
}

export interface UpdateOrganizationInput
  extends Partial<CreateOrganizationInput> {
  id: string
}
