if (!process.env.DATABASE_URL) {
	try {
		await import('dotenv/config');
	} catch {}
}

const { migrate } = await import('drizzle-orm/node-postgres/migrator');
const { db, closeDb } = await import('./client.js');

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
