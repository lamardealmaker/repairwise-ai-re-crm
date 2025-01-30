# Product Requirements Document: AI-Driven Ticket Creation System

## 0. Current System Status & Known Issues

### 0.1 Critical Issues

#### Context Management Issues
```typescript
// Current Problem in message-store.ts
export class ChatMessageStore {
  async addMessage(threadId: string, message: Message) {
    // ISSUE: Context arrays not being properly serialized
    // Current behavior: Shows [Object] in logs
    // Affects: Short-term and long-term context storage
    const contextUpdate = {
      shortTerm: thread.messages.slice(-5), // Not properly serialized
      longTerm: thread.context.longTerm, // Not properly serialized
      metadata: thread.context.metadata,
      summary: thread.context.summary
    };
  }
}
```

#### Conversation History Loss
- AI responses don't maintain previous context
- Repeated questions about already provided information
- Context window not properly maintaining conversation history

#### Message Creation Issues
```typescript
// Current Problem in chat-actions.ts
export async function sendMessageAction(
  content: string,
  messages: Message[] = []
): Promise<ActionState<SendMessageResponse>> {
  // ISSUE: Messages being created multiple times
  // ISSUE: Inconsistent session IDs
  // Affects: Message threading and context maintenance
}
```

### 0.2 Required Pre-Implementation Fixes

#### Context Serialization Fix
```typescript
// In message-store.ts
export class ChatMessageStore {
  async addMessage(threadId: string, message: Message) {
    const contextUpdate = {
      shortTerm: JSON.stringify(thread.messages.slice(-5)),
      longTerm: JSON.stringify(thread.context.longTerm),
      metadata: thread.context.metadata,
      summary: thread.context.summary
    };
  }
}
```

#### Message Creation Fix
```typescript
export async function sendMessageAction(
  content: string,
  messages: Message[] = []
): Promise<ActionState<SendMessageResponse>> {
  // Required fixes:
  // 1. Add message deduplication
  // 2. Ensure consistent session IDs
  // 3. Implement proper message threading
}
```

## 1. Project Overview

### 1.1 Problem Statement
The current system has a chat interface where tenants can communicate with an AI assistant, but the process of converting these conversations into actionable maintenance tickets needs to be streamlined and automated.

### 1.2 Goals
- Create a seamless flow from chat conversation to ticket creation
- Accurately identify maintenance issues through AI analysis
- Automate ticket creation with proper categorization and priority
- Maintain context throughout the conversation
- Provide clear feedback to users about ticket status

### 1.3 Project Structure
```
/actions
  /db
    - chat-actions.ts      # Handles chat message operations
    - tickets-actions.ts   # Handles ticket operations
  - context-actions.ts     # Manages conversation context
/lib
  /ai
    - chat-analysis.ts     # AI analysis implementation
    - context-manager.ts   # Context management logic
/types
  - ai-types.ts           # AI-related type definitions
  - chat-types.ts         # Chat-related type definitions
  - tickets-types.ts      # Ticket-related type definitions
```

## 2. Implementation Phases

### Phase 0: System Repairs (Week 1)
1. Fix Context Serialization
```typescript
// Update context-manager.ts
export async function updateContextAction(
  message: Message
): Promise<ActionState<ContextWindow>> {
  try {
    const parsedContext = {
      shortTerm: Array.isArray(context.shortTerm) ? context.shortTerm : [],
      longTerm: Array.isArray(context.longTerm) ? context.longTerm : [],
      metadata: typeof context.metadata === "string" 
        ? JSON.parse(context.metadata) 
        : context.metadata || {}
    };
    // Implementation...
  } catch (error) {
    console.error("Context update failed:", error);
    return { isSuccess: false, message: "Failed to update context" };
  }
}
```

2. Fix Message Creation
```typescript
// Update chat-actions.ts
export async function createChatMessageAction(
  params: InsertChatMessage
): Promise<ActionState<SelectChatMessage>> {
  try {
    // Add deduplication check
    const existing = await findExistingMessage(params);
    if (existing) return { isSuccess: true, data: existing };
    
    // Create message
    const [newMessage] = await db
      .insert(chatMessagesTable)
      .values(params)
      .returning();
      
    return { isSuccess: true, data: newMessage };
  } catch (error) {
    console.error("Message creation failed:", error);
    return { isSuccess: false, message: "Failed to create message" };
  }
}
```

### Phase 1: Core Functionality (Week 2)

1. Database Schema Updates
```sql
ALTER TABLE tickets 
ADD COLUMN chat_session_id UUID REFERENCES chat_sessions(id),
ADD COLUMN ai_generated BOOLEAN DEFAULT false,
ADD COLUMN confidence_score DECIMAL(3,2);
```

2. AI Analysis Implementation
```typescript
// In lib/ai/chat-analysis.ts
export async function analyzeConversation(messages: Message[]) {
  const ANALYSIS_PROMPT = `
    Analyze the following conversation between a tenant and AI assistant.
    Focus on:
    1. Identifying maintenance issues requiring attention
    2. Determining urgency and impact
    3. Categorizing the issue type
    4. Extracting relevant context
    
    Format response as:
    {
      "ticketSuggestion": {
        "title": "Clear, concise issue description",
        "priority": "low|medium|high|critical",
        "category": "maintenance|billing|noise_complaint|other",
        "summary": "Detailed problem description",
        "confidence": 0.0-1.0,
        "relevantMessageIds": ["msg1", "msg2"]
      }
    }
  `;
  
  // Implementation...
}
```

### Phase 2: UI Integration (Week 3)

1. Context Sidebar Enhancement
```typescript
// In app/tenant/chat/_components/context-sidebar.tsx
export default function ContextSidebar({
  isOpen,
  onClose,
  ticketSuggestion,
  insights,
  context,
  onCreateTicket
}: ContextSidebarProps) {
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);
  
  // Implementation...
  
  return (
    <div className="w-80 border-l bg-white p-4">
      {/* Ticket suggestion UI */}
      {ticketSuggestion && (
        <TicketSuggestionCard
          suggestion={ticketSuggestion}
          onCreateTicket={handleCreateTicket}
          isLoading={isCreatingTicket}
        />
      )}
    </div>
  );
}
```

## 3. Error Handling & Edge Cases

### 3.1 Common Pitfalls & Solutions

1. **Context Loss**
```typescript
// Solution: Implement context persistence
export class ChatMessageStore {
  private async persistContext(threadId: string, context: ContextWindow) {
    try {
      await db.transaction(async (trx) => {
        await updateChatContextAction(threadId, context);
        await this.backupContext(threadId, context);
      });
    } catch (error) {
      await this.restoreContext(threadId);
    }
  }
}
```

2. **Race Conditions**
```typescript
// Solution: Implement debouncing and locking
let analysisInProgress = false;
const analyzeWithDebounce = debounce(async (messages: Message[]) => {
  if (analysisInProgress) return;
  try {
    analysisInProgress = true;
    await analyzeConversation(messages);
  } finally {
    analysisInProgress = false;
  }
}, 1000);
```

## 4. Testing Requirements

### 4.1 Unit Tests
```typescript
// In __tests__/chat-analysis.test.ts
describe('Chat Analysis', () => {
  test('should detect maintenance issues', async () => {
    const messages = [
      createMessage('user', 'My sink is leaking'),
      createMessage('assistant', 'I understand you have a plumbing issue'),
    ];
    
    const analysis = await analyzeConversation(messages);
    expect(analysis.ticketSuggestion).toBeTruthy();
    expect(analysis.ticketSuggestion?.category).toBe('maintenance');
  });
});
```

### 4.2 Integration Tests
```typescript
// In __tests__/ticket-creation.test.ts
describe('Ticket Creation Flow', () => {
  test('should create ticket from chat', async () => {
    const session = await createChatSession();
    await addMessage(session.id, 'My sink is leaking');
    const analysis = await analyzeConversation(session.messages);
    const ticket = await createTicketFromChat(session.id, analysis.ticketSuggestion);
    
    expect(ticket.isSuccess).toBe(true);
    expect(ticket.data.chatSessionId).toBe(session.id);
  });
});
```

## 5. Success Metrics

### 5.1 Technical Metrics
- Response time < 2 seconds for analysis
- Error rate < 1%
- Test coverage > 90%
- Zero unhandled exceptions

### 5.2 User Experience Metrics
- Ticket creation time < 30 seconds
- User satisfaction > 90%
- Ticket accuracy > 95%

## 6. Documentation Requirements

### 6.1 Code Documentation
1. JSDoc comments for all new functions
2. Type definitions for all interfaces
3. Error handling documentation
4. Example usage in comments

### 6.2 User Documentation
1. Update README.md
2. Create API documentation
3. Add usage examples
4. Document error codes

## 7. Deployment & Monitoring

### 7.1 Deployment Checklist
1. Database migrations
2. Environment variables
3. API key configuration
4. Backup procedures

### 7.2 Monitoring Requirements
1. Error tracking
2. Performance monitoring
3. Usage analytics
4. User feedback collection 