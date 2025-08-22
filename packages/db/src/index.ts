import { Pool } from 'pg';
import { readFileSync, existsSync } from 'fs';
import { env } from '@lukes-projects/config';

function wantsSslFromUrl(url: string) {
	// support both styles: ?sslmode=require and ?ssl=true
	return /(?:[?&])sslmode=require\b/i.test(url) || /(?:[?&])ssl=true\b/i.test(url);
}

function buildSsl(url: string) {
	const caPath = process.env.PGSSLROOTCERT;
	console.log({ caPath });
	if (caPath && existsSync(caPath)) {
		return { ca: readFileSync(caPath, 'utf8') }; // verify with provided CA
	}
	if (process.env.DB_SSL_INSECURE === 'true') {
		return { rejectUnauthorized: false }; // temporary unblock
	}
	const envWantsSsl = (process.env.DB_SSL || '').toLowerCase() === 'true';
	if (envWantsSsl || wantsSslFromUrl(url)) {
		return true; // enable TLS using system CAs
	}
	return undefined; // no TLS (local dev)
}

// TEMP singleton pool for testing on app
export const pool = new Pool({
	connectionString: env.DATABASE_URL,
	ssl: buildSsl(env.DATABASE_URL)
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
