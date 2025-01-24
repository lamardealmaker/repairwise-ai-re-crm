import { SelectProfile } from "@/db/schema"

export interface Profile extends SelectProfile {
  id: string
  userId: string
  fullName: string | null
  email: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateProfileInput {
  userId: string
  fullName: string | null
  email: string
}

export interface UpdateProfileInput {
  id: string
  fullName: string | null
}
