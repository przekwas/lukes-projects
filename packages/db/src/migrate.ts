import 'dotenv/config';

import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db, closeDb } from './client.js';

async function main() {
	await migrate(db, { migrationsFolder: 'drizzle' });
	await closeDb();
	// eslint-disable-next-line no-console
	console.log('✅ migrations applied');
}

main().catch(err => {
	// eslint-disable-next-line no-console
	console.error('❌ migration failed', err);
	process.exit(1);
});
