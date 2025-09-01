# Mega Server Monorepo

This repository is the home of my personal **Mega Server** project, a TypeScript monorepo that is my command center for multiple backend applications. It is designed as a learning playground, portfolio piece, and practical backend for apps I build for myself and friends.

---

## Tech Stack

-   **Language:** TypeScript
-   **Runtime:** Node.js
-   **Framework:** Fastify
-   **Database:** PostgreSQL
-   **ORM/Querying:** Drizzle ORM + raw SQL bootstrap
-   **Auth:** Cookie-based session tokens with guards
-   **Deployment:** Docker + Render (prod), Docker + WSL2 (local dev)

---

## Project Structure

./
├── apps
│ └── server
│ ├── src
│ │ ├── auth/ # Authentication & session guards
│ │ ├── health/ # Health checks
│ │ ├── poke/ # Test/demo endpoints
│ │ └── ...
│ ├── sql/ # Bootstrap schema & hardening
│ └── ...
├── packages
│ ├── config/ # Shared env/config utils
│ └── db/ # Drizzle schema & query utils

-   `apps/server` → the main API server (Fastify, modular feature folders).
-   `packages/config` → environment variables and config loader.
-   `packages/db` → Drizzle schema, migrations, and query wrappers.

---

## Features

-   Modular **auth system** with:
    -   Cookie-based session tokens.
    -   `SessionGuard` for route protection.
    -   `RoleLevelGuard` for per-app role/permission enforcement.
-   **CSRF protection** with optional skip for future webhooks.
-   **Rate limiting** (login/register) to slow down password spraying.
-   **CORS + security headers** prepared for future frontends.
-   **Database bootstrap** with plain SQL:
    -   Drizzle generate and migrate
    -   `sql/01_hardening.sql` > constraints and indexes
    -   `sql/0[2-9]_seed_(dev|prod).sql` > seeding some data for testing
-   Session service handles creation, validation, and expiration.
-   Health check + poke endpoints for testing.
-   App-specific roles system.

---

## Current Apps

-   **Workout Tracker** > simple CRUD fitness tracker (in progress).
-   **NFL Pick League** > friends-only league for weekly NFL game picks (in progress).

---

## Comments

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

### App expectations

-   IDs: generated in code via `crypto.randomUUID()`
-   Emails: `email = email.trim().toLowerCase()` before insert/login
-   Session tokens: `randomBytes(32).toString('hex')` (64+ chars); cookie is httpOnly, secure in prod
