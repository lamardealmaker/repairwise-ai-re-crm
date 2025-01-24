# Database Schema Documentation

## How to Get Current Schema

Run these queries in the Supabase SQL Editor or via psql (requires PostgreSQL client) to get the current schema:

```sql
-- Show all enum types and their values
SELECT 
    t.typname AS enum_name,
    e.enumlabel AS enum_value
FROM pg_type t 
JOIN pg_enum e ON t.oid = e.enumtypid  
JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
WHERE n.nspname = 'public'
ORDER BY enum_name, e.enumsortorder;

-- Show all tables and their columns
SELECT 
    t.table_name,
    c.column_name,
    c.data_type,
    c.column_default,
    c.is_nullable,
    c.character_maximum_length,
    tc.constraint_type,
    cc.table_name as referenced_table,
    cc.column_name as referenced_column
FROM information_schema.tables t
LEFT JOIN information_schema.columns c 
    ON t.table_name = c.table_name 
    AND t.table_schema = c.table_schema
LEFT JOIN information_schema.key_column_usage kcu
    ON c.column_name = kcu.column_name 
    AND c.table_name = kcu.table_name
    AND c.table_schema = kcu.table_schema
LEFT JOIN information_schema.table_constraints tc
    ON kcu.constraint_name = tc.constraint_name
    AND kcu.table_schema = tc.table_schema
LEFT JOIN information_schema.constraint_column_usage cc
    ON tc.constraint_name = cc.constraint_name
    AND tc.table_schema = cc.table_schema
WHERE t.table_schema = 'public'
    AND t.table_type = 'BASE TABLE'
ORDER BY 
    t.table_name,
    c.ordinal_position;

-- Show all indexes
SELECT
    tablename as table_name,
    indexname as index_name,
    indexdef as index_definition
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;
```

## Current Schema (as of January 23, 2024)

### Enum Types

```sql
enum membership {
    free
    pro
}

enum ticket_category {
    maintenance
    billing
    noise_complaint
    other
}

enum ticket_priority {
    low
    medium
    high
    critical
}

enum ticket_status {
    open
    in_progress
    completed
    closed
    completed_by_chat
}

enum user_role {
    tenant
    staff
}
```

### Tables

#### users
```sql
CREATE TABLE users (
    id text PRIMARY KEY NOT NULL,
    clerk_id text NOT NULL UNIQUE,
    role user_role NOT NULL DEFAULT 'tenant',
    email text NOT NULL,
    full_name text,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now()
);
```

#### profiles
```sql
CREATE TABLE profiles (
    user_id text PRIMARY KEY NOT NULL,
    membership membership NOT NULL DEFAULT 'free',
    stripe_customer_id text,
    stripe_subscription_id text,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now()
);
```

#### tickets
```sql
CREATE TABLE tickets (
    id text PRIMARY KEY NOT NULL,
    tenant_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title text NOT NULL,
    description text NOT NULL,
    status ticket_status NOT NULL DEFAULT 'open',
    category ticket_category NOT NULL,
    priority ticket_priority NOT NULL DEFAULT 'low',
    cost_estimate text,
    time_estimate text,
    emergency_level text,
    user_tone text,
    chat_history jsonb,
    chat_summary text,
    resolution_details text,
    time_spent text,
    cost_incurred text,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now(),
    closed_at timestamp
);
```

#### ticket_messages
```sql
CREATE TABLE ticket_messages (
    id text PRIMARY KEY NOT NULL,
    ticket_id text NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
    sender_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    message text NOT NULL,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now()
);
```

#### todos
```sql
CREATE TABLE todos (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    user_id text NOT NULL,
    content text NOT NULL,
    completed boolean NOT NULL DEFAULT false,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now()
);
```

### Indexes
```sql
-- profiles
CREATE UNIQUE INDEX profiles_pkey ON profiles USING btree (user_id);

-- ticket_messages
CREATE UNIQUE INDEX ticket_messages_pkey ON ticket_messages USING btree (id);

-- tickets
CREATE UNIQUE INDEX tickets_pkey ON tickets USING btree (id);

-- todos
CREATE UNIQUE INDEX todos_pkey ON todos USING btree (id);

-- users
CREATE UNIQUE INDEX users_clerk_id_unique ON users USING btree (clerk_id);
CREATE UNIQUE INDEX users_pkey ON users USING btree (id);
```

## How to Update This Document

1. Get access to the database (either through Supabase SQL Editor or database connection string)
2. Run the queries from the "How to Get Current Schema" section
3. Update the sections in this document with the new schema information
4. Add a note in the document header with the new date of the update

Note: Never include sensitive information like connection strings or credentials in this document. These should be stored in environment variables and accessed securely when needed. 