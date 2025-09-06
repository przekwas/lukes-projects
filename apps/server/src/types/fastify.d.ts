import type { SessionUser } from '../types/session-user';

declare module 'fastify' {
	interface FastifyRequest {
		user?: SessionUser;
	}
}
