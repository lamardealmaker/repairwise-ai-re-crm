import { SelectProperty } from "@/db/schema"

export interface Property extends SelectProperty {
  id: string
  orgId: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface CreatePropertyInput {
  orgId: string
  name: string
}

export interface UpdatePropertyInput
  extends Partial<Omit<CreatePropertyInput, "orgId">> {
  id: string
}
