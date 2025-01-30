-- Add metadata column to chat_sessions table
ALTER TABLE chat_sessions 
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{"shortTerm": "[]", "longTerm": "[]", "metadata": {}, "summary": ""}';

-- Migrate existing rows to have the default metadata
UPDATE chat_sessions 
SET metadata = '{"shortTerm": "[]", "longTerm": "[]", "metadata": {}, "summary": ""}'
WHERE metadata IS NULL; 