# API Response Formats

## Overview
This document details the standard response formats for all API endpoints in the AI Chat Ticket System.

## Standard Response Format

### Success Response
```typescript
interface SuccessResponse<T> {
  data: T
  status: 'success'
  timestamp: string
}
```

### Error Response
```typescript
interface ErrorResponse {
  error: {
    code: string
    message: string
    details?: unknown
  }
  status: 'error'
  timestamp: string
}
```

## Data Types

### Chat Session
```typescript
interface ChatSession {
  id: string
  tenantId: string
  status: 'active' | 'resolved' | 'archived'
  hasTicket: boolean
  createdAt: string
  updatedAt: string
}
```

### Chat Message
```typescript
interface ChatMessage {
  id: string
  sessionId: string
  content: string
  role: 'user' | 'assistant'
  metadata?: Record<string, unknown>
  attachments?: ChatAttachment[]
  createdAt: string
}
```

### Chat Attachment
```typescript
interface ChatAttachment {
  id: string
  messageId: string
  fileUrl: string
  fileName: string
  fileType: string
  createdAt: string
}
```

### Chat Ticket
```typescript
interface ChatTicket {
  id: string
  sessionId: string
  ticketId: string
  createdAt: string
}
```

## Response Examples

### Create Chat Session
```typescript
// Success
{
  data: {
    id: "123e4567-e89b-12d3-a456-426614174000",
    tenantId: "tenant_123",
    status: "active",
    hasTicket: false,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  status: "success",
  timestamp: "2024-01-01T00:00:00Z"
}

// Error
{
  error: {
    code: "validation_error",
    message: "Invalid tenant ID",
    details: {
      field: "tenantId",
      constraint: "required"
    }
  },
  status: "error",
  timestamp: "2024-01-01T00:00:00Z"
}
```

### Send Message
```typescript
// Success
{
  data: {
    id: "123e4567-e89b-12d3-a456-426614174000",
    sessionId: "123e4567-e89b-12d3-a456-426614174000",
    content: "Hello, how can I help you?",
    role: "assistant",
    attachments: [
      {
        id: "123e4567-e89b-12d3-a456-426614174000",
        messageId: "123e4567-e89b-12d3-a456-426614174000",
        fileUrl: "https://example.com/file.pdf",
        fileName: "document.pdf",
        fileType: "application/pdf",
        createdAt: "2024-01-01T00:00:00Z"
      }
    ],
    createdAt: "2024-01-01T00:00:00Z"
  },
  status: "success",
  timestamp: "2024-01-01T00:00:00Z"
}

// Error
{
  error: {
    code: "not_found",
    message: "Chat session not found",
    details: {
      sessionId: "123e4567-e89b-12d3-a456-426614174000"
    }
  },
  status: "error",
  timestamp: "2024-01-01T00:00:00Z"
}
```

## Stream Response Format

### Chat Stream
```typescript
interface ChatStreamChunk {
  id: string
  chunk: string
  done: boolean
}
```

Example:
```typescript
{
  id: "123e4567-e89b-12d3-a456-426614174000",
  chunk: "Hello",
  done: false
}
{
  id: "123e4567-e89b-12d3-a456-426614174000",
  chunk: ", how can I help you?",
  done: true
}
```

## Error Codes

### Authentication Errors
- `unauthorized`: Missing authentication
- `forbidden`: Insufficient permissions

### Validation Errors
- `validation_error`: Invalid input data
- `invalid_format`: Incorrect data format

### Resource Errors
- `not_found`: Resource doesn't exist
- `already_exists`: Resource already exists
- `conflict`: Resource state conflict

### Server Errors
- `server_error`: Internal server error
- `service_unavailable`: Service temporarily unavailable

### Rate Limiting
- `rate_limit_exceeded`: Too many requests

## HTTP Status Codes

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict
- 429: Too Many Requests
- 500: Internal Server Error
- 503: Service Unavailable

## Response Headers

```typescript
{
  'Content-Type': 'application/json',
  'X-Request-ID': string,
  'X-RateLimit-Limit': string,
  'X-RateLimit-Remaining': string,
  'X-RateLimit-Reset': string
}
```

## Type Definitions

```typescript
// types/api-types.ts

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse

export interface SuccessResponse<T> {
  data: T
  status: 'success'
  timestamp: string
}

export interface ErrorResponse {
  error: {
    code: string
    message: string
    details?: unknown
  }
  status: 'error'
  timestamp: string
}

export type ApiErrorCode =
  | 'unauthorized'
  | 'forbidden'
  | 'not_found'
  | 'validation_error'
  | 'server_error'
  | 'rate_limit_exceeded'
  | 'invalid_format'
  | 'already_exists'
  | 'conflict'
  | 'service_unavailable'
``` 