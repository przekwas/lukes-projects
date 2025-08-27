import { CanActivate, ExecutionContext, Injectable, Inject } from '@nestjs/common';
import { db, apps, memberships, roles } from '@lukes-projects/db';
import { and, eq } from 'drizzle-orm';
import { Observable } from 'rxjs';

export function RoleLevelGuard(required: number) {
	@Injectable()
	class Guard implements CanActivate {
		async canActivate(ctx: ExecutionContext) {
			const req = ctx.switchToHttp().getRequest();
			const userId = req.user?.id;
			const appKey = req.headers['x-app-key'];
			if (!userId || !appKey) return false;

			const row = await db
				.select({ level: roles.level })
				.from(memberships)
				.innerJoin(apps, eq(memberships.appId, apps.id))
				.innerJoin(roles, eq(memberships.roleId, roles.id))
				.where(and(eq(memberships.userId, userId), eq(apps.key, String(appKey))))
				.limit(1);

			return (row?.[0]?.level ?? 0) >= required;
		}
	}

	return Guard;
}
