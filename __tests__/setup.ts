import { beforeAll, vi } from "vitest"

beforeAll(() => {
  // Set up test environment variables
  process.env.DATABASE_URL = "postgres://test:test@localhost:5432/test_db"
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = "test_key"
  process.env.CLERK_SECRET_KEY = "test_secret"
  
  // Mock Clerk auth
  vi.mock("@clerk/nextjs", () => ({
    auth: () => ({
      userId: "test_user_id"
    }),
    currentUser: () => ({
      id: "test_user_id"
    })
  }))
  
  // Mock database calls
  vi.mock("@/db/db", () => ({
    db: {
      insert: vi.fn(),
      select: vi.fn(),
      delete: vi.fn(),
      update: vi.fn(),
      query: {
        chatMessages: {
          findMany: vi.fn().mockResolvedValue([])
        },
        chatThreads: {
          findMany: vi.fn().mockResolvedValue([])
        }
      }
    }
  }))
}) 

