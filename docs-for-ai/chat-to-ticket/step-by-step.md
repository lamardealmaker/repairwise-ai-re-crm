# Chat-to-Ticket Implementation Guide: Step by Step

This document provides a detailed, step-by-step guide for implementing the chat-to-ticket feature. Each step is atomic and can be implemented and tested independently.

## Phase 0: System Repairs

### Step 1: Fix Context Serialization
```prompt
Update the message-store.ts file to properly serialize context arrays. Specifically:
1. Locate the addMessage method in the ChatMessageStore class
2. Modify the contextUpdate object to properly serialize arrays
3. Add type checking for the context data
4. Add error handling for serialization failures

Use this exact implementation:
```typescript
async addMessage(threadId: string, message: Message) {
  const contextUpdate = {
    shortTerm: JSON.stringify(thread.messages.slice(-5)),
    longTerm: JSON.stringify(thread.context.longTerm),
    metadata: thread.context.metadata,
    summary: thread.context.summary
  };
}
```
Verify the change by checking the logs - they should now show proper JSON strings instead of [Object].
```

### Step 2: Message Deduplication
```prompt
Implement message deduplication in chat-actions.ts. Create a new function findExistingMessage that will:
1. Take message parameters as input
2. Check for existing messages with the same content and sessionId within a 5-second window
3. Return the existing message if found, null otherwise

Implementation should look like:
```typescript
async function findExistingMessage(params: InsertChatMessage): Promise<SelectChatMessage | null> {
  const fiveSecondsAgo = new Date(Date.now() - 5000);
  
  const [existing] = await db
    .select()
    .from(chatMessagesTable)
    .where(and(
      eq(chatMessagesTable.sessionId, params.sessionId),
      eq(chatMessagesTable.content, params.content),
      gte(chatMessagesTable.createdAt, fiveSecondsAgo)
    ))
    .limit(1);
    
  return existing || null;
}
```
Test by rapidly sending the same message multiple times - only one should be created.
```

### Step 3: Session ID Consistency
```prompt
Update the chat session management to ensure consistent session IDs. In the ChatMessageStore class:
1. Add a session tracking mechanism
2. Implement session validation
3. Add session recovery logic

Add this code to message-store.ts:
```typescript
private async validateSession(sessionId: string): Promise<boolean> {
  const session = await db
    .select()
    .from(chatSessionsTable)
    .where(eq(chatSessionsTable.id, sessionId))
    .limit(1);
    
  return !!session;
}

async addMessage(threadId: string, message: Message) {
  if (!await this.validateSession(threadId)) {
    throw new Error(`Invalid session ID: ${threadId}`);
  }
  // Rest of the implementation...
}
```
Test by attempting to add messages with invalid session IDs - should throw errors.
```

## Phase 1: Core Analysis

### Step 4: Database Schema Update
```prompt
Update the database schema to support chat-to-ticket conversion. Execute these changes:

1. Create a new migration file in db/migrations with this SQL:
```sql
ALTER TABLE tickets 
ADD COLUMN chat_session_id UUID REFERENCES chat_sessions(id),
ADD COLUMN ai_generated BOOLEAN DEFAULT false,
ADD COLUMN confidence_score DECIMAL(3,2);

CREATE INDEX idx_tickets_chat_session ON tickets(chat_session_id);
```

2. Update the tickets schema in db/schema/tickets-schema.ts:
```typescript
export const ticketsTable = pgTable("tickets", {
  // ... existing columns ...
  chatSessionId: uuid("chat_session_id").references(() => chatSessionsTable.id),
  aiGenerated: boolean("ai_generated").default(false).notNull(),
  confidenceScore: decimal("confidence_score", { precision: 3, scale: 2 })
});
```

Verify by checking the database structure and attempting to create a ticket with these new fields.
```

### Step 5: AI Analysis Types
```prompt
Create new type definitions for the AI analysis system in types/ai-types.ts:

1. Add these exact types:
```typescript
export interface TicketAnalysis {
  ticketSuggestion: {
    title: string;
    priority: "low" | "medium" | "high" | "critical";
    category: "maintenance" | "billing" | "noise_complaint" | "other";
    summary: string;
    confidence: number;
    relevantMessageIds: string[];
  } | null;
  insights: Array<{
    type: "issue" | "request" | "feedback";
    content: string;
    confidence: number;
    context?: string;
  }>;
}

export interface AnalysisResult {
  isSuccess: boolean;
  analysis: TicketAnalysis | null;
  error?: string;
}
```

2. Export these types in types/index.ts
3. Verify by importing and using in a test file
```

### Step 6: Analysis Prompt Engineering
```prompt
Create the AI analysis prompt in lib/ai/chat-analysis.ts:

1. Implement this exact prompt:
```typescript
const ANALYSIS_PROMPT = `You are an AI assistant analyzing conversations between tenants and property management.

Your task is to:
1. Identify maintenance issues or important requests
2. Determine urgency and impact
3. Categorize the issue type
4. Extract relevant context

Rules:
- Only suggest tickets for actual maintenance issues or important requests
- Assign priority based on safety and urgency
- Maintain high confidence threshold (>0.8) for suggestions
- Include specific details from the conversation

Format response exactly as:
{
  "ticketSuggestion": {
    "title": "Clear, concise issue description",
    "priority": "low|medium|high|critical",
    "category": "maintenance|billing|noise_complaint|other",
    "summary": "Detailed problem description",
    "confidence": 0.0-1.0,
    "relevantMessageIds": ["msg1", "msg2"]
  },
  "insights": [
    {
      "type": "issue|request|feedback",
      "content": "Insight description",
      "confidence": 0.0-1.0,
      "context": "Related context"
    }
  ]
}`;
```

2. Test with sample conversations
3. Verify output format matches exactly
```

### Step 7: Implement Analysis Function
```prompt
Create the conversation analysis function in lib/ai/chat-analysis.ts:

1. Implement this function:
```typescript
export async function analyzeConversation(
  messages: Message[]
): Promise<AnalysisResult> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: ANALYSIS_PROMPT },
        { 
          role: "user", 
          content: messages
            .map(m => `${m.role.toUpperCase()}: ${m.content}`)
            .join("\n")
        }
      ],
      temperature: 0.2,
      response_format: { type: "json_object" }
    });

    const analysis = JSON.parse(completion.choices[0].message.content);
    return {
      isSuccess: true,
      analysis: validateAnalysis(analysis) ? analysis : null
    };
  } catch (error) {
    console.error("Analysis failed:", error);
    return {
      isSuccess: false,
      analysis: null,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}
```

2. Add validation function:
```typescript
function validateAnalysis(analysis: any): boolean {
  // Add validation logic
  return true; // Implement proper validation
}
```

3. Test with real conversation data
```

### Step 8: Ticket Generation
```prompt
Create the ticket generation function in actions/db/tickets-actions.ts:

1. Implement this function:
```typescript
export async function createTicketFromAnalysis(
  sessionId: string,
  analysis: TicketAnalysis
): Promise<ActionState<SelectTicket>> {
  try {
    if (!analysis.ticketSuggestion) {
      return {
        isSuccess: false,
        message: "No ticket suggestion in analysis"
      };
    }

    const ticket: InsertTicket = {
      id: crypto.randomUUID(),
      chatSessionId: sessionId,
      title: analysis.ticketSuggestion.title,
      description: analysis.ticketSuggestion.summary,
      category: analysis.ticketSuggestion.category,
      priority: analysis.ticketSuggestion.priority,
      status: "open",
      aiGenerated: true,
      confidenceScore: analysis.ticketSuggestion.confidence,
      metadata: {
        relevantMessageIds: analysis.ticketSuggestion.relevantMessageIds,
        insights: analysis.insights
      }
    };

    return await createTicketAction(ticket);
  } catch (error) {
    console.error("Failed to create ticket from analysis:", error);
    return {
      isSuccess: false,
      message: "Failed to create ticket"
    };
  }
}
```

2. Test with sample analysis data
3. Verify all fields are properly set in created ticket
```

## Phase 2: UI Integration

### Step 9: Ticket Suggestion Component
```prompt
Create a new component for displaying ticket suggestions in app/tenant/chat/_components/ticket-suggestion-card.tsx:

1. Implement this component:
```typescript
export function TicketSuggestionCard({
  suggestion,
  onCreateTicket,
  isLoading
}: {
  suggestion: TicketSuggestion;
  onCreateTicket: () => Promise<void>;
  isLoading: boolean;
}) {
  return (
    <div className="rounded-lg border p-4 bg-white shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{suggestion.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{suggestion.summary}</p>
        </div>
        <Badge variant={getPriorityVariant(suggestion.priority)}>
          {suggestion.priority}
        </Badge>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex gap-2">
          <Badge variant="outline">{suggestion.category}</Badge>
          <Badge variant="outline">
            {Math.round(suggestion.confidence * 100)}% confidence
          </Badge>
        </div>
        
        <Button
          onClick={onCreateTicket}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Creating..." : "Create Ticket"}
        </Button>
      </div>
    </div>
  );
}
```

2. Add to context sidebar
3. Test rendering with sample data
```

### Step 10: Context Sidebar Integration
```prompt
Update the context sidebar to handle ticket suggestions in app/tenant/chat/_components/context-sidebar.tsx:

1. Add state management:
```typescript
export default function ContextSidebar({
  isOpen,
  ticketSuggestion,
  onCreateTicket
}: ContextSidebarProps) {
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleCreateTicket = async () => {
    try {
      setIsCreatingTicket(true);
      setError(null);
      await onCreateTicket();
      toast.success("Ticket created successfully");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to create ticket");
      toast.error("Failed to create ticket");
    } finally {
      setIsCreatingTicket(false);
    }
  };
  
  return (
    <div className="w-80 border-l bg-white p-4">
      {ticketSuggestion && (
        <TicketSuggestionCard
          suggestion={ticketSuggestion}
          onCreateTicket={handleCreateTicket}
          isLoading={isCreatingTicket}
        />
      )}
      {error && (
        <div className="mt-2 text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}
```

2. Test error handling
3. Verify loading states
```

### Step 11: Error Handling Implementation
```prompt
Create a comprehensive error handling system in lib/errors/chat-ticket-errors.ts:

1. Implement these error classes and utilities:
```typescript
export class ChatTicketError extends Error {
  constructor(
    message: string,
    public code: string,
    public context?: Record<string, any>
  ) {
    super(message);
    this.name = 'ChatTicketError';
  }
}

export const ERROR_CODES = {
  ANALYSIS_FAILED: 'ANALYSIS_FAILED',
  CONTEXT_INVALID: 'CONTEXT_INVALID',
  TICKET_CREATION_FAILED: 'TICKET_CREATION_FAILED',
  SESSION_INVALID: 'SESSION_INVALID',
  LOW_CONFIDENCE: 'LOW_CONFIDENCE'
} as const;

export function handleChatTicketError(error: unknown): ChatTicketError {
  if (error instanceof ChatTicketError) return error;
  
  const message = error instanceof Error ? error.message : 'Unknown error';
  return new ChatTicketError(message, 'UNKNOWN_ERROR', { originalError: error });
}

// Add error boundary component
export function ChatTicketErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      fallback={({ error }) => (
        <div className="p-4 border border-red-200 rounded-lg bg-red-50">
          <h3 className="text-red-800 font-medium">Something went wrong</h3>
          <p className="text-red-600 text-sm mt-1">{error.message}</p>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  );
}
```

2. Implement error handling in all major functions
3. Add error boundary to main chat component
4. Test error scenarios
```

### Step 12: Testing Setup - Unit Tests
```prompt
Create comprehensive unit tests in __tests__/chat-ticket/unit/:

1. Create analysis.test.ts:
```typescript
import { analyzeConversation } from '@/lib/ai/chat-analysis';
import { createMockMessage } from '@/test/factories';

describe('Chat Analysis', () => {
  test('should detect maintenance issues', async () => {
    const messages = [
      createMockMessage('user', 'My sink is leaking and causing water damage'),
      createMockMessage('assistant', 'I understand you have a plumbing issue'),
    ];
    
    const result = await analyzeConversation(messages);
    expect(result.isSuccess).toBe(true);
    expect(result.analysis?.ticketSuggestion).toBeTruthy();
    expect(result.analysis?.ticketSuggestion?.category).toBe('maintenance');
    expect(result.analysis?.ticketSuggestion?.priority).toBe('high');
  });

  test('should not suggest ticket for general inquiry', async () => {
    const messages = [
      createMockMessage('user', 'What are your office hours?'),
    ];
    
    const result = await analyzeConversation(messages);
    expect(result.isSuccess).toBe(true);
    expect(result.analysis?.ticketSuggestion).toBeNull();
  });
});
```

2. Create ticket-creation.test.ts:
```typescript
import { createTicketFromAnalysis } from '@/actions/db/tickets-actions';
import { createMockAnalysis } from '@/test/factories';

describe('Ticket Creation', () => {
  test('should create ticket from valid analysis', async () => {
    const analysis = createMockAnalysis({
      title: 'Leaking Sink',
      priority: 'high',
      confidence: 0.95
    });
    
    const result = await createTicketFromAnalysis('test-session', analysis);
    expect(result.isSuccess).toBe(true);
    expect(result.data.title).toBe('Leaking Sink');
  });
});
```

3. Run tests and verify coverage
```

### Step 13: Testing Setup - Integration Tests
```prompt
Create integration tests in __tests__/chat-ticket/integration/:

1. Create chat-to-ticket-flow.test.ts:
```typescript
import { testDb } from '@/test/utils/test-db';
import { ChatMessageStore } from '@/lib/stores/message-store';

describe('Chat to Ticket Flow', () => {
  beforeEach(async () => {
    await testDb.reset();
  });

  test('complete flow from chat to ticket', async () => {
    // 1. Create chat session
    const store = new ChatMessageStore('test-user');
    const sessionId = await store.createThread();

    // 2. Add messages
    await store.addMessage(sessionId, {
      id: 'msg1',
      content: 'My bathroom has a severe leak causing flooding',
      role: 'user'
    });

    // 3. Analyze conversation
    const analysis = await analyzeConversation(store.getCurrentThread()!.messages);
    expect(analysis.isSuccess).toBe(true);
    expect(analysis.analysis?.ticketSuggestion?.priority).toBe('critical');

    // 4. Create ticket
    const ticket = await createTicketFromAnalysis(sessionId, analysis.analysis!);
    expect(ticket.isSuccess).toBe(true);
    expect(ticket.data.aiGenerated).toBe(true);
    expect(ticket.data.priority).toBe('critical');
  });
});
```

2. Create UI integration test:
```typescript
import { render, fireEvent, waitFor } from '@testing-library/react';
import { ChatPage } from '@/app/tenant/chat/page';

test('ticket suggestion UI flow', async () => {
  const { getByText, getByRole } = render(<ChatPage />);
  
  // Enter message
  fireEvent.change(getByRole('textbox'), {
    target: { value: 'My sink is leaking' }
  });
  fireEvent.click(getByRole('button', { name: /send/i }));
  
  // Wait for suggestion
  await waitFor(() => {
    expect(getByText(/create ticket/i)).toBeInTheDocument();
  });
  
  // Create ticket
  fireEvent.click(getByText(/create ticket/i));
  
  // Verify success
  await waitFor(() => {
    expect(getByText(/ticket created successfully/i)).toBeInTheDocument();
  });
});
```

3. Run integration tests
```

### Step 14: Performance Monitoring Setup
```prompt
Implement performance monitoring in lib/monitoring/chat-ticket-metrics.ts:

1. Create monitoring setup:
```typescript
import { Metric } from '@/lib/monitoring/types';

export const chatTicketMetrics = {
  async trackAnalysis(duration: number, success: boolean) {
    await Metric.create({
      name: 'chat_ticket_analysis',
      value: duration,
      tags: { success: String(success) }
    });
  },

  async trackTicketCreation(duration: number, confidence: number) {
    await Metric.create({
      name: 'chat_ticket_creation',
      value: duration,
      tags: { 
        confidence_level: getConfidenceLevel(confidence)
      }
    });
  },

  async trackUserInteraction(type: 'accept' | 'reject' | 'modify') {
    await Metric.create({
      name: 'chat_ticket_interaction',
      value: 1,
      tags: { type }
    });
  }
};

// Add to analysis function
export async function analyzeConversation(messages: Message[]) {
  const startTime = performance.now();
  try {
    const result = await originalAnalyzeConversation(messages);
    await chatTicketMetrics.trackAnalysis(
      performance.now() - startTime,
      result.isSuccess
    );
    return result;
  } catch (error) {
    await chatTicketMetrics.trackAnalysis(
      performance.now() - startTime,
      false
    );
    throw error;
  }
}
```

2. Add monitoring dashboard setup
3. Configure alerts for key metrics
```

### Step 15: User Feedback Collection
```prompt
Implement feedback collection in app/tenant/chat/_components/feedback-collector.tsx:

1. Create feedback component:
```typescript
export function TicketFeedbackCollector({
  ticketId,
  onFeedbackSubmit
}: {
  ticketId: string;
  onFeedbackSubmit: (feedback: TicketFeedback) => Promise<void>;
}) {
  const [rating, setRating] = useState<1|2|3|4|5>(0);
  const [comment, setComment] = useState('');
  
  return (
    <div className="mt-4 p-4 border rounded-lg">
      <h4 className="font-medium">How was this ticket suggestion?</h4>
      
      <div className="flex gap-2 mt-2">
        {[1,2,3,4,5].map(value => (
          <button
            key={value}
            onClick={() => setRating(value as 1|2|3|4|5)}
            className={cn(
              "p-2 rounded",
              rating === value ? "bg-blue-100" : "bg-gray-50"
            )}
          >
            {value}
          </button>
        ))}
      </div>
      
      <textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Any additional feedback?"
        className="mt-2 w-full p-2 border rounded"
      />
      
      <Button
        onClick={() => onFeedbackSubmit({ rating, comment })}
        className="mt-2"
      >
        Submit Feedback
      </Button>
    </div>
  );
}
```

2. Add feedback handling:
```typescript
export async function submitTicketFeedback(
  ticketId: string,
  feedback: TicketFeedback
): Promise<ActionState<void>> {
  try {
    await db
      .insert(ticketFeedbackTable)
      .values({
        ticketId,
        rating: feedback.rating,
        comment: feedback.comment,
        createdAt: new Date()
      });
      
    await chatTicketMetrics.trackFeedback(feedback.rating);
    
    return { isSuccess: true, message: "Feedback submitted" };
  } catch (error) {
    console.error("Failed to submit feedback:", error);
    return { isSuccess: false, message: "Failed to submit feedback" };
  }
}
```

3. Integrate into ticket creation flow
```

### Step 16: Documentation - API Reference
```prompt
Create API documentation in docs-for-ai/chat-to-ticket/api-reference.md:

1. Document all endpoints and functions:
```markdown
# Chat-to-Ticket API Reference

## Analysis API

### analyzeConversation
Analyzes chat messages to detect ticket-worthy issues.

**Input:**
```typescript
messages: Message[] // Array of chat messages
```

**Output:**
```typescript
{
  isSuccess: boolean;
  analysis: TicketAnalysis | null;
  error?: string;
}
```

### createTicketFromAnalysis
Creates a ticket based on conversation analysis.

**Input:**
```typescript
sessionId: string;
analysis: TicketAnalysis;
```

**Output:**
```typescript
{
  isSuccess: boolean;
  data?: SelectTicket;
  message: string;
}
```

## Error Codes

| Code | Description | Resolution |
|------|-------------|------------|
| ANALYSIS_FAILED | AI analysis failed | Retry or check API status |
| CONTEXT_INVALID | Invalid context data | Verify context format |
| ... | ... | ... |
```

2. Add code examples
3. Add error handling documentation
```

### Step 17: Documentation - User Guide
```prompt
Create user documentation in docs-for-ai/chat-to-ticket/user-guide.md:

1. Write comprehensive guide:
```markdown
# Chat-to-Ticket User Guide

## Overview
The Chat-to-Ticket system automatically detects maintenance issues in tenant conversations and suggests ticket creation.

## Features
- Automatic issue detection
- Smart priority assignment
- One-click ticket creation
- Feedback collection

## How It Works

1. **Chat with AI Assistant**
   - Describe your maintenance issue
   - Provide relevant details
   - Answer AI's questions

2. **Review Ticket Suggestion**
   - Check issue summary
   - Verify priority level
   - Review category assignment

3. **Create Ticket**
   - Click "Create Ticket" button
   - Add additional details if needed
   - Submit feedback

## Best Practices
- Be specific about issues
- Mention urgency level
- Include location details
- Report multiple issues separately
```

2. Add screenshots
3. Add troubleshooting guide
```

### Step 18: Deployment Procedure
```prompt
Create deployment documentation in docs-for-ai/chat-to-ticket/deployment.md:

1. Document deployment steps:
```markdown
# Deployment Procedure

## Pre-deployment Checklist
- [ ] Run full test suite
- [ ] Check database migrations
- [ ] Verify environment variables
- [ ] Test rollback procedure

## Environment Variables
```env
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_ENABLE_TICKET_SUGGESTIONS=true
TICKET_CONFIDENCE_THRESHOLD=0.8
```

## Database Migration
```bash
# 1. Backup database
pg_dump -Fc -f backup.dump $DATABASE_URL

# 2. Run migrations
pnpm db:migrate

# 3. Verify migration
pnpm db:verify
```

## Deployment Steps
1. Deploy database changes
2. Deploy application updates
3. Run smoke tests
4. Monitor error rates

## Rollback Procedure
```bash
# 1. Revert application
git revert HEAD

# 2. Revert database
pnpm db:rollback
```
```

2. Add monitoring setup
3. Add alert configuration
```

### Step 19: Testing Checklist
```prompt
Create testing checklist in docs-for-ai/chat-to-ticket/testing-checklist.md:

1. Document test scenarios:
```markdown
# Testing Checklist

## Functional Testing

### Chat Analysis
- [ ] Test different maintenance issues
- [ ] Test non-maintenance conversations
- [ ] Test multiple issues in one conversation
- [ ] Test priority detection
- [ ] Test confidence scoring

### Ticket Creation
- [ ] Test automatic ticket creation
- [ ] Test manual ticket creation
- [ ] Test ticket fields population
- [ ] Test attachments handling
- [ ] Test error scenarios

### UI/UX
- [ ] Test suggestion card display
- [ ] Test loading states
- [ ] Test error messages
- [ ] Test feedback collection
- [ ] Test responsive design

## Performance Testing
- [ ] Test analysis response time
- [ ] Test concurrent conversations
- [ ] Test database performance
- [ ] Test memory usage
- [ ] Test error handling

## Security Testing
- [ ] Test input validation
- [ ] Test authentication
- [ ] Test authorization
- [ ] Test data privacy
- [ ] Test API security
```

2. Add test data samples
3. Add testing procedures
```

### Step 20: Monitoring Setup
```prompt
Create monitoring setup in lib/monitoring/setup.ts:

1. Implement monitoring configuration:
```typescript
import { Monitoring } from '@/lib/monitoring';

export const chatTicketMonitoring = new Monitoring({
  metrics: {
    analysisLatency: {
      type: 'histogram',
      name: 'chat_ticket_analysis_latency',
      help: 'Latency of chat analysis in milliseconds',
      buckets: [100, 250, 500, 1000, 2000, 5000]
    },
    ticketCreationSuccess: {
      type: 'counter',
      name: 'chat_ticket_creation_total',
      help: 'Total number of tickets created',
      labelNames: ['status', 'priority']
    },
    userFeedback: {
      type: 'gauge',
      name: 'chat_ticket_feedback_score',
      help: 'User feedback scores for ticket suggestions',
      labelNames: ['rating']
    }
  },
  
  alerts: {
    highLatency: {
      condition: 'chat_ticket_analysis_latency_avg > 2000',
      severity: 'warning',
      summary: 'High chat analysis latency detected'
    },
    highErrorRate: {
      condition: 'rate(chat_ticket_creation_total{status="error"}[5m]) > 0.1',
      severity: 'critical',
      summary: 'High ticket creation error rate'
    }
  },
  
  dashboards: {
    main: {
      title: 'Chat-to-Ticket Overview',
      panels: [
        {
          title: 'Analysis Latency',
          metric: 'chat_ticket_analysis_latency',
          type: 'graph'
        },
        {
          title: 'Ticket Creation Success Rate',
          metric: 'chat_ticket_creation_total',
          type: 'counter'
        },
        {
          title: 'User Feedback Distribution',
          metric: 'chat_ticket_feedback_score',
          type: 'histogram'
        }
      ]
    }
  }
});
```

2. Add monitoring initialization to app startup
3. Configure alert notifications
4. Set up dashboard access
``` 