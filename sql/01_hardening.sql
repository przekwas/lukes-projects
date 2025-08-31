BEGIN;

-- Case-insensitive unique email (column is plain varchar)
-- Make sure you normalize in code too: email = lower(trim(email))
CREATE UNIQUE INDEX IF NOT EXISTS users_email_lower_idx
  ON users (lower(email));

-- Role code whitelist (no Postgres ENUM; matches your TS union)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'roles_code_check') THEN
    ALTER TABLE roles
      ADD CONSTRAINT roles_code_check
      CHECK (code IN ('owner','admin','member','viewer'));
  END IF;
END$$;

-- Keep role levels sane
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'roles_level_check') THEN
    ALTER TABLE roles
      ADD CONSTRAINT roles_level_check
      CHECK (level BETWEEN 0 AND 100);
  END IF;
END$$;

-- Enforce sluggy app keys
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'apps_key_slug') THEN
    ALTER TABLE apps
      ADD CONSTRAINT apps_key_slug
      CHECK (key ~ '^[a-z0-9-]{2,64}$');
  END IF;
END$$;

-- Session token hygiene (32-byte hex = 64 chars)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'sessions_token_len') THEN
    ALTER TABLE sessions
      ADD CONSTRAINT sessions_token_len
      CHECK (length(token) >= 64);
  END IF;
END$$;

-- Fast lookups for active sessions (no now() in predicate)
CREATE INDEX IF NOT EXISTS sessions_active_user_idx
  ON sessions (user_id, expires_at)
  WHERE revoked = false;

-- Expiry sweep
CREATE INDEX IF NOT EXISTS sessions_expires_at_idx
  ON sessions (expires_at);

-- OPTIONAL: stronger integrity so memberships.role_id must belong to memberships.app_id
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'roles_app_id_id_unique') THEN
    ALTER TABLE roles
      ADD CONSTRAINT roles_app_id_id_unique UNIQUE (app_id, id);
  END IF;
END$$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'memberships_app_role_fk') THEN
    ALTER TABLE memberships
      ADD CONSTRAINT memberships_app_role_fk
      FOREIGN KEY (app_id, role_id) REFERENCES roles(app_id, id) ON DELETE RESTRICT;
  END IF;
END$$;

COMMIT;
