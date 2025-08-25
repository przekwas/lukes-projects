#!/bin/sh
set -e

# Require DATABASE_URL at runtime
if [ -z "$DATABASE_URL" ]; then
  echo "ERROR: DATABASE_URL is not set"
  exit 1
fi

# Optionally run DB migrations before starting the server
if [ "$MIGRATE_ON_START" = "true" ]; then
  echo "Running migrations..."
  node packages/db/dist/migrate.js
fi

exec "$@"
