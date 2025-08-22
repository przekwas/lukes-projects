import { Pool } from 'pg';
import { readFileSync } from 'fs';
import { env, isProd } from '@lukes-projects/config';

// TEMP singleton pool for testing on app
export const pool = new Pool({
	connectionString: env.DATABASE_URL,
	ssl: isProd ? true : undefined
});

export async function query(text: string, params?: any[]) {
	return pool.query(text, params);
}

// TEMP test table
export async function initDb() {
	await pool.query(`
        CREATE TABLE IF NOT EXISTS poke (
            id SERIAL PRIMARY KEY,
            msg TEXT NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );    
    `);

	const { rows } = await pool.query(`SELECT COUNT(*) AS count FROM poke;`);
	const count = parseInt(rows[0].count, 10);
	if (count === 0) {
		await pool.query(`INSERT INTO poke (msg) VALUES ($1);`, ['hello from docker 👋']);
	}
}

export async function closeDb() {
	await pool.end();
}
