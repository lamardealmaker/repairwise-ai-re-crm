-- Add new columns to tickets table
ALTER TABLE tickets 
ADD COLUMN chat_session_id UUID REFERENCES chat_sessions(id),
ADD COLUMN ai_generated BOOLEAN DEFAULT false,
ADD COLUMN confidence_score DECIMAL(3,2);

-- Add constraint for confidence score range
ALTER TABLE tickets
ADD CONSTRAINT confidence_score_range 
CHECK (confidence_score >= 0.00 AND confidence_score <= 1.00);

-- Add index for chat session relationship
CREATE INDEX idx_tickets_chat_session ON tickets(chat_session_id);

-- Note: chatTicketsTable will be deprecated in favor of direct relationship 