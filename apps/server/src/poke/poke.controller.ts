import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { db } from '@lukes-projects/db';
import { SessionGuard } from '../auth/session.guard.js';
import { RoleLevelGuard } from '../auth/role-level.guard.js';

@Controller('poke')
export class PokeController {
	// TEMP public api route test
	@Get()
	async list() {
		const rows = await db.query.poke.findMany({
			orderBy: (t, { desc }) => [desc(t.createdAt)],
			limit: 10
		});
		return rows;
	}

	// TEMP private api route for logged in user
	@UseGuards(SessionGuard)
	@Get('secure')
	async secure(@Req() req: any) {
		return { ok: true, user: req.user };
	}

	// TEMP private api route only for admin logged in user
	@UseGuards(SessionGuard, RoleLevelGuard(80))
	@Get('admin')
	async admin(@Req() req: any) {
		return { ok: true, user: req.user, message: 'Admin route works!' };
	}
}
