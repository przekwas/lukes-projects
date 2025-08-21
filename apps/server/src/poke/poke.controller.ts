import { Controller, Get } from '@nestjs/common';
// import { query } from '@lukes-projects/db';

type PokeRow = { id: number; msg: string; created_at: string };

@Controller('poke')
export class PokeController {
	@Get()
    get() {
        return 'test';
    }
	// async list(): Promise<PokeRow[]> {
	// 	const { rows } = await query<PokeRow>(`
    //         SELECT id, msg, created_at
    //         FROM poke
    //         ORDER by id DESC
    //         LIMIT 10;    
    //     `);

	// 	return rows;
	// }
}
