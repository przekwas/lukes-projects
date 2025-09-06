export type SessionUser = {
	id: string;
	email: string;
	displayName: string | null;
	appRoles: Array<{ appKey: string; code: string; level: number }>;
};
