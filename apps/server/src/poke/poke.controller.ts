import { Controller, Get } from '@nestjs/common';
import { db } from '@lukes-projects/db';

@Controller('poke')
export class PokeController {
	@Get()
	async list() {
		const rows = await db.query.poke.findMany({
			orderBy: (t, { desc }) => [desc(t.id)],
			limit: 10
		});
		return rows;
	}
}
