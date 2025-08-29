import { and, eq, gt } from 'drizzle-orm';
import { db } from '../client.js';
import { users, sessions, userRoles, roles, apps } from '../schema.js';

// export async function findUserBySessionToken(sessionToken: string) {
//     const [s] = await db.select({ userId: sessions.userId, revoked: sessions.revokedAt, })
// }