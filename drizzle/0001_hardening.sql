-- Case-insensitive unique email (column is plain varchar)
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

-- ✅ Replace the old failing index (no now() in predicate)
CREATE INDEX IF NOT EXISTS sessions_active_user_idx
  ON sessions (user_id, expires_at)
  WHERE revoked = false;

-- Sweep by expiry
CREATE INDEX IF NOT EXISTS sessions_expires_at_idx
  ON sessions (expires_at);
