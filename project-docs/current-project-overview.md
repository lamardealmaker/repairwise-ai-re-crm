# Current Project Overview

This is a tenant management system with the following structure and features:

## Authentication & Authorization
- Uses Clerk for authentication
- Has two user roles: `tenant` and `staff`
- Each user has a profile with membership status (`free` or `pro`)

## Database Structure
- `users`: Core user information with Clerk integration
- `profiles`: Extended user information with Stripe subscription details
- `tickets`: Support ticket system with rich metadata
- `ticket_messages`: Communication thread for tickets
- `todos`: Task management system

## Application Structure
- Separate routes for tenants and staff (`/tenant` and `/staff`)
- Marketing pages under `(marketing)`
- Authentication pages under `(auth)`
- API routes under `api`

## Key Features

### Ticket Management System
- Multiple categories:
  - Maintenance
  - Billing
  - Noise complaints
  - Other
- Priority levels:
  - Low
  - Medium
  - High
  - Critical
- Status tracking:
  - Open
  - In progress
  - Completed
  - Closed
  - Completed by chat
- Rich metadata:
  - Cost and time estimation
  - Chat history and summaries
  - Resolution details
  - Time spent tracking
  - Cost tracking

### User Management
- Profile management
- Role-based access control
- Membership levels

### Payment Integration
- Stripe integration for pro memberships
- Customer and subscription tracking

## Tech Stack

### Frontend
- Next.js
- Tailwind CSS
- Shadcn components
- Framer Motion

### Backend
- Server Actions
- Drizzle ORM
- PostgreSQL (via Supabase)

### Services
- Authentication: Clerk
- Database: Supabase
- Payments: Stripe
- Analytics: PostHog
- Deployment: Vercel

## Best Practices Implementation
- Type safety throughout with TypeScript
- Server-side rendering with Next.js
- Structured database schema with relationships
- Clear separation of concerns between tenant and staff interfaces
- Comprehensive error handling and state management

## Project Structure
- `actions` - Server actions
  - `db` - Database related actions
  - Other actions
- `app` - Next.js app router
  - `api` - API routes
  - Route-specific components and layouts
- `components` - Shared components
  - `ui` - UI components
  - `utilities` - Utility components
- `db` - Database
  - `schema` - Database schemas
- `lib` - Library code
  - `hooks` - Custom hooks
- `prompts` - Prompt files
- `public` - Static assets
- `types` - Type definitions 

## How to Update This Document

When updating this document after adding new features or making changes, follow these steps:

1. **Code Analysis**
   ```bash
   # Directories to check for changes
   - app/          # New routes or pages
   - actions/      # New server actions
   - components/   # New shared components
   - db/schema/    # Schema changes
   - types/        # New type definitions
   ```

2. **Feature Updates**
   - Add new features under the appropriate section in "Key Features"
   - If creating a new feature category, add a new subsection
   - Update feature lists to reflect any removed or modified features

3. **Structure Changes**
   - Update "Application Structure" if new route patterns are added
   - Update "Project Structure" if new directories or major files are added
   - Update "Database Structure" if new tables or relationships are added

4. **Tech Stack Updates**
   - Add new technologies under the appropriate category
   - Remove deprecated technologies
   - Update versions if significant changes occur

5. **Best Practices**
   - Update if new patterns or practices are established
   - Remove outdated practices

6. **Verification Steps**
   - Cross-reference with `schema-info.md` for database changes
   - Check app router structure for route changes
   - Review server actions for new functionality
   - Check component library for UI changes

7. **Date and Version**
   - Add a note at the top of the document with the date of the last update
   - If versioning is implemented, update the version number

Note: This document should be updated whenever significant changes are made to the application structure, features, or technology stack. Minor changes (like bug fixes or small tweaks) don't need to be documented here unless they affect the overall architecture or feature set. 