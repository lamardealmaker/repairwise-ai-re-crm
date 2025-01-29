# API Endpoints

## Overview
This document details all API endpoints for the AI Chat Ticket System.

## Chat Endpoints

### Create Chat Session
```typescript
POST /api/chat/sessions

Request:
{
  tenantId: string
}

Response:
{
  id: string
  tenantId: string
  status: string
  createdAt: string
  updatedAt: string
}
```

### Send Message
```typescript
POST /api/chat/messages

Request:
{
  sessionId: string
  content: string
  attachments?: {
    fileName: string
    fileType: string
    fileData: Base64
  }[]
}

Response:
{
  id: string
  content: string
  role: 'assistant' | 'user'
  createdAt: string
  attachments?: {
    id: string
    fileUrl: string
    fileName: string
    fileType: string
  }[]
}
```

### Get Chat History
```typescript
GET /api/chat/sessions/:sessionId/messages

Response:
{
  messages: {
    id: string
    content: string
    role: 'assistant' | 'user'
    createdAt: string
    attachments?: {
      id: string
      fileUrl: string
      fileName: string
      fileType: string
    }[]
  }[]
}
```

### Create Ticket from Chat
```typescript
POST /api/chat/sessions/:sessionId/ticket

Request:
{
  title?: string
  category?: string
  priority?: string
}

Response:
{
  ticketId: string
  chatTicketId: string
  status: string
}
```

## File Handling

### Upload File
```typescript
POST /api/chat/files

Request:
FormData {
  file: File
  sessionId: string
  messageId?: string
}

Response:
{
  id: string
  fileUrl: string
  fileName: string
  fileType: string
}
```

### Delete File
```typescript
DELETE /api/chat/files/:fileId

Response:
{
  success: boolean
}
```

## Session Management

### Update Session Status
```typescript
PATCH /api/chat/sessions/:sessionId

Request:
{
  status: 'active' | 'resolved' | 'archived'
}

Response:
{
  id: string
  status: string
  updatedAt: string
}
```

### Delete Session
```typescript
DELETE /api/chat/sessions/:sessionId

Response:
{
  success: boolean
}
```

## Error Responses

### Standard Error Format
```typescript
{
  error: {
    code: string
    message: string
    details?: any
  }
}
```

### Common Error Codes
- `unauthorized`: Authentication required
- `forbidden`: Permission denied
- `not_found`: Resource not found
- `validation_error`: Invalid input
- `server_error`: Internal server error

## Rate Limiting

### Limits
- 100 requests per minute per user
- 1000 requests per hour per user
- 5MB max file size
- 10 files per message

### Rate Limit Response
```typescript
{
  error: {
    code: 'rate_limit_exceeded'
    message: string
    resetAt: string
  }
}
```

## Authentication

All endpoints require authentication via Clerk.
Authentication is handled through the `Authorization` header:

```typescript
headers: {
  'Authorization': 'Bearer ${clerkToken}'
}
```

## Implementation Notes

### Server Actions
All endpoints are implemented as Next.js Server Actions for optimal performance and type safety.

Example implementation:
```typescript
// app/actions/chat-actions.ts
"use server"

export async function sendMessage(sessionId: string, content: string) {
  const { userId } = auth()
  if (!userId) throw new Error("Unauthorized")

  // Implementation
}
```

### Error Handling
All endpoints should:
1. Validate input
2. Check permissions
3. Handle errors gracefully
4. Return consistent error format

### Performance
- Use edge functions where possible
- Implement caching strategies
- Stream large responses
- Optimize database queries

### Security
- Validate all input
- Sanitize file uploads
- Check permissions
- Rate limit requests
- Encrypt sensitive data 