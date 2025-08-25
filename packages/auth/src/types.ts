export type AuthUser = {
  id: number;
  email: string;
  displayName: string;
};

export type SessionData = {
  userId: number;
  issuedAt: number;
};
