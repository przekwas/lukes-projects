import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { apps, roles } from './schema.js';
import { eq, and } from 'drizzle-orm';

import 'dotenv/config';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

async function main() {
	// Apps to seed
	const appSeeds = [
		{ key: 'workout-tracker', name: 'Workout Tracker' },
		{ key: 'nfl-pick-league', name: 'NFL Pick League' }
	];

	for (const app of appSeeds) {
		// insert app if not exists
		let [existing] = await db.select().from(apps).where(eq(apps.key, app.key));

		if (!existing) {
			[existing] = await db.insert(apps).values(app).returning();
			console.log(`✅ Inserted app: ${app.name}`);
		} else {
			console.log(`ℹ️ App already exists: ${app.name}`);
		}

		// Roles per app
		const roleSeeds = [
			{ code: 'owner', level: 100 },
			{ code: 'admin', level: 80 },
			{ code: 'member', level: 50 },
			{ code: 'viewer', level: 10 }
		];

		for (const r of roleSeeds) {
			const [role] = await db
				.select()
				.from(roles)
				.where(and(eq(roles.appId, existing.id), eq(roles.code, r.code)))
				.limit(1);

			if (!role) {
				await db.insert(roles).values({
					appId: existing.id,
					code: r.code,
					level: r.level
				});
				console.log(`   ➕ Role ${r.code} for ${app.name}`);
			}
		}
	}

	await pool.end();
}

main().catch(err => {
	console.error(err);
	process.exit(1);
});
