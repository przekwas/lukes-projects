# Comments

`// TEMP` and `// TODO` and `// DEBUG` are searchable for features till I get a kanban board up in GitHub.

## Current Server Todos

-   /auth/me route (quick user fetch using SessionGuard)
    -   **started**
-   Session rotation (issue a new token occasionally or on privilege change)
-   Remember-me: increase maxAge when a flag is passed
-   input validation for every route
-   error model for consistent shape
-   secuity headers with helmet adjusted
-   cors for when domains are gotten
-   update .env, .env.example, package/config, and main to streamline env vars process

## Future Server Todos

-   Webhooks
    -   CSRF Skip for these

## Current Pick League Todos

-   domain schema
-   lock logic
-   result ingestion
-   scoring rules
-   visibility
-   edits/audits
-   concurrency
-   regrade jobs
-   admin tools
-   pagination/filters
-   rate limits
-

## Database bootstrap (no drizzle migrator)

We manage the initial schema and hardening with plain SQL. No extensions, no enums. I had too many issue and stopped caring between local and prod DB's. App code generates UUIDs and normalizes emails.

### 0) Create DB (example)

createdb mydb

### 1) Apply initial schema

psql "$DATABASE_URL" -f sql/00_init.sql

### 2) Apply hardening (constraints + indexes)

psql "$DATABASE_URL" -f sql/01_hardening.sql

### App expectations

-   IDs: generated in code via `crypto.randomUUID()`
-   Emails: `email = email.trim().toLowerCase()` before insert/login
-   Session tokens: `randomBytes(32).toString('hex')` (64+ chars); cookie is httpOnly, secure in prod
