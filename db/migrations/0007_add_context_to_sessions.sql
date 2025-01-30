-- Add context column to chat_sessions table
ALTER TABLE chat_sessions 
ADD COLUMN IF NOT EXISTS context JSONB DEFAULT '{"shortTerm": "[]", "longTerm": "[]", "metadata": {}, "summary": ""}';

-- Migrate existing rows to have the default context
UPDATE chat_sessions 
SET context = '{"shortTerm": "[]", "longTerm": "[]", "metadata": {}, "summary": ""}'
WHERE context IS NULL; 