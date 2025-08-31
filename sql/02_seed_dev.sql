BEGIN;

-- Apps
INSERT INTO apps (id, key, name, created_at) VALUES
  ('00000000-0000-0000-0000-000000000001','workout-tracker','Workout Tracker', now()),
  ('00000000-0000-0000-0000-000000000002','nfl-pick-league','NFL Pick League', now())
ON CONFLICT (id) DO NOTHING;

-- Roles for each app (owner/admin/member/viewer)
-- workout-tracker roles
INSERT INTO roles (id, app_id, code, level, created_at) VALUES
  ('00000000-0000-0000-0000-000000000a11','00000000-0000-0000-0000-000000000001','owner', 100, now()),
  ('00000000-0000-0000-0000-000000000a12','00000000-0000-0000-0000-000000000001','admin',  90, now()),
  ('00000000-0000-0000-0000-000000000a13','00000000-0000-0000-0000-000000000001','member', 50, now()),
  ('00000000-0000-0000-0000-000000000a14','00000000-0000-0000-0000-000000000001','viewer', 10, now())
ON CONFLICT (id) DO NOTHING;

-- nfl-pick-league roles
INSERT INTO roles (id, app_id, code, level, created_at) VALUES
  ('00000000-0000-0000-0000-000000000b11','00000000-0000-0000-0000-000000000002','owner', 100, now()),
  ('00000000-0000-0000-0000-000000000b12','00000000-0000-0000-0000-000000000002','admin',  90, now()),
  ('00000000-0000-0000-0000-000000000b13','00000000-0000-0000-0000-000000000002','member', 50, now()),
  ('00000000-0000-0000-0000-000000000b14','00000000-0000-0000-0000-000000000002','viewer', 10, now())
ON CONFLICT (id) DO NOTHING;

-- Users
INSERT INTO users (id, email, password_hash, display_name, is_active, created_at) VALUES
  ('00000000-0000-0000-0000-0000000000a1', 'owner@lukes-projects',      'dev-hash', 'Owner', true, now()),
  ('00000000-0000-0000-0000-0000000000a2', 'admin@lukes-project.com',    'dev-hash', 'Admin', true, now()),
  ('00000000-0000-0000-0000-0000000000a3', 'guest@lukes-projects.com',   'dev-hash', 'Guest', true, now())
ON CONFLICT (id) DO NOTHING;

-- Memberships (1 role per user per app)
-- Owner = owner; Admin = admin; Guest = viewer — in both apps
-- workout-tracker
INSERT INTO memberships (user_id, app_id, role_id, created_at) VALUES
  ('00000000-0000-0000-0000-0000000000a1','00000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000a11', now()),
  ('00000000-0000-0000-0000-0000000000a2','00000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000a12', now()),
  ('00000000-0000-0000-0000-0000000000a3','00000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000a14', now())
ON CONFLICT (user_id, app_id) DO NOTHING;

-- nfl-pick-league
INSERT INTO memberships (user_id, app_id, role_id, created_at) VALUES
  ('00000000-0000-0000-0000-0000000000a1','00000000-0000-0000-0000-000000000002','00000000-0000-0000-0000-000000000b11', now()),
  ('00000000-0000-0000-0000-0000000000a2','00000000-0000-0000-0000-000000000002','00000000-0000-0000-0000-000000000b12', now()),
  ('00000000-0000-0000-0000-0000000000a3','00000000-0000-0000-0000-000000000002','00000000-0000-0000-0000-000000000b14', now())
ON CONFLICT (user_id, app_id) DO NOTHING;

-- Dev sessions (purely for local testing; tokens are 64-hex)
INSERT INTO sessions (token, user_id, expires_at, created_at) VALUES
  ('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa','00000000-0000-0000-0000-0000000000a1', now() + interval '7 days', now()),
  ('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb','00000000-0000-0000-0000-0000000000a2', now() + interval '7 days', now()),
  ('cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc','00000000-0000-0000-0000-0000000000a3', now() + interval '7 days', now())
ON CONFLICT DO NOTHING;

COMMIT;
