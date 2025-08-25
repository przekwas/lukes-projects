export const ROLE_LEVELS = {
  owner: 100,
  admin: 80,
  member: 50,
  viewer: 10,
} as const;

export const COOKIE = {
  auth: 'auth',
  refresh: 'refresh',
} as const;

export const PASSWORD_MIN_LENGTH = 8;
