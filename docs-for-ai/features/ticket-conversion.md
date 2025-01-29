# Ticket Conversion Specification

## Overview
This document details the process of converting chat conversations into support tickets in the AI Chat Ticket System.

## Conversion Process

### Trigger Points
1. AI Suggestion
   - Issue resolution reached
   - Complex problem detected
   - Multiple issues identified
   - Escalation needed

2. User Request
   - Manual ticket creation
   - Quick action selection
   - Command usage
   - Button click

3. Automatic
   - Time threshold reached
   - Priority detected
   - Pattern matched
   - Rule triggered

## Data Extraction

### Ticket Information
```typescript
interface TicketExtraction {
  // Basic information
  basic: {
    title: string
    description: string
    category: string
    priority: 'low' | 'medium' | 'high' | 'urgent'
  }
  
  // Additional details
  details: {
    location?: string
    timeline?: string
    impact?: string
    attempts?: string
  }
  
  // Metadata
  metadata: {
    source: 'chat'
    sessionId: string
    createdAt: string
    aiSuggested: boolean
  }
}
```

### Content Processing
```typescript
interface ContentProcessor {
  // Extract key information
  extract: {
    identifyIssue: (messages: Message[]) => string
    determineCategory: (content: string) => string
    assessPriority: (content: string) => Priority
    findLocation: (content: string) => string | null
  }
  
  // Format content
  format: {
    formatTitle: (issue: string) => string
    formatDescription: (messages: Message[]) => string
    formatTimeline: (messages: Message[]) => string
    formatMetadata: (data: any) => Record<string, any>
  }
}
```

## Conversion Flow

### Steps
1. Information Gathering
   - Collect chat history
   - Extract key details
   - Identify attachments
   - Gather metadata

2. Ticket Creation
   - Generate ticket data
   - Preview generation
   - User confirmation
   - Ticket submission

3. Post-Creation
   - Update chat status
   - Send notifications
   - Link references
   - Archive chat

### State Management
```typescript
interface ConversionState {
  // Conversion states
  status:
    | 'preparing'
    | 'previewing'
    | 'confirming'
    | 'creating'
    | 'completed'
    | 'failed'
  
  // Data states
  data: {
    isValid: boolean
    isComplete: boolean
    needsReview: boolean
    canEdit: boolean
  }
  
  // UI states
  ui: {
    showPreview: boolean
    showEdit: boolean
    showConfirm: boolean
    showError: boolean
  }
}
```

## User Interface

### Preview Interface
```typescript
interface TicketPreview {
  // Display sections
  sections: {
    summary: boolean
    details: boolean
    attachments: boolean
    metadata: boolean
  }
  
  // Edit capabilities
  editable: {
    title: boolean
    category: boolean
    priority: boolean
    description: boolean
  }
  
  // Actions
  actions: {
    edit: boolean
    confirm: boolean
    cancel: boolean
    back: boolean
  }
}
```

### Edit Interface
```typescript
interface TicketEdit {
  // Edit modes
  modes: {
    inline: boolean
    modal: boolean
    fullscreen: boolean
  }
  
  // Validation
  validation: {
    required: string[]
    format: Record<string, RegExp>
    limits: Record<string, number>
  }
  
  // Auto-save
  autoSave: {
    enabled: boolean
    interval: number
    backup: boolean
  }
}
```

## Validation

### Rules
```typescript
interface ValidationRules {
  // Required fields
  required: {
    title: boolean
    category: boolean
    priority: boolean
    description: boolean
  }
  
  // Format rules
  format: {
    titleMaxLength: number
    descriptionMinLength: number
    categoryAllowed: string[]
    priorityLevels: string[]
  }
  
  // Content rules
  content: {
    noPersonalInfo: boolean
    noProfanity: boolean
    noHTML: boolean
    allowMarkdown: boolean
  }
}
```

### Validation Process
```typescript
interface ValidationProcess {
  // Validation steps
  steps: {
    validateRequired: (data: TicketData) => ValidationResult
    validateFormat: (data: TicketData) => ValidationResult
    validateContent: (data: TicketData) => ValidationResult
    validateAttachments: (files: File[]) => ValidationResult
  }
  
  // Error handling
  errors: {
    collect: (results: ValidationResult[]) => ValidationError[]
    format: (errors: ValidationError[]) => string[]
    display: (errors: string[]) => void
  }
}
```

## Integration

### Ticket System Integration
```typescript
interface TicketIntegration {
  // Creation methods
  create: {
    fromChat: (sessionId: string) => Promise<Ticket>
    withAttachments: (ticket: Ticket, files: File[]) => Promise<Ticket>
    withMetadata: (ticket: Ticket, metadata: any) => Promise<Ticket>
  }
  
  // Reference handling
  reference: {
    linkChat: (ticketId: string, sessionId: string) => Promise<void>
    attachFiles: (ticketId: string, fileIds: string[]) => Promise<void>
    addNotes: (ticketId: string, notes: string) => Promise<void>
  }
}
```

### Notification System
```typescript
interface NotificationSystem {
  // Notification types
  types: {
    ticketCreated: boolean
    needsReview: boolean
    conversionFailed: boolean
    statusUpdate: boolean
  }
  
  // Recipients
  recipients: {
    tenant: boolean
    staff: boolean
    system: boolean
    admin: boolean
  }
  
  // Channels
  channels: {
    inApp: boolean
    email: boolean
    push: boolean
    webhook: boolean
  }
}
```

## Error Handling

### Error Types
```typescript
type ConversionError =
  | 'invalid_data'
  | 'missing_required'
  | 'validation_failed'
  | 'creation_failed'
  | 'attachment_failed'
  | 'system_error'
```

### Error Handling
```typescript
interface ErrorHandler {
  // Handle specific errors
  handlers: {
    handleValidationError: (error: ValidationError) => void
    handleCreationError: (error: CreationError) => void
    handleSystemError: (error: SystemError) => void
  }
  
  // Recovery options
  recovery: {
    retryConversion: () => Promise<void>
    saveAsDraft: () => Promise<void>
    manualCreation: () => void
  }
}
```

## Testing

### Test Scenarios
1. Conversion Tests
   - Basic conversion
   - Complex conversations
   - Multiple issues
   - Edge cases

2. Validation Tests
   - Required fields
   - Format validation
   - Content rules
   - File validation

3. Integration Tests
   - Ticket creation
   - File handling
   - Notification delivery
   - Error recovery

4. User Interface Tests
   - Preview display
   - Edit functionality
   - Confirmation flow
   - Error messages 