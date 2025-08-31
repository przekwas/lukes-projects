export type AuthUser = {
  id: string;
  email: string;
  displayName: string;
};

export type SessionData = {
  userId: string;
  issuedAt: number;
};
