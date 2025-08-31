import type { AuthUser } from '@lukes-projects/auth';

declare module 'fastify' {
	interface FastifyRequest {
		user?: AuthUser;
	}
}
