import { Pool } from 'pg';
import { readFileSync, existsSync } from 'fs';
import { env, isProd } from '@lukes-projects/config';

// Prefer an env-provided CA path (set in prod), otherwise:
// - if DB_SSL_INSECURE=true → use TLS but skip verification (quick unblock)
// - else → no ssl option (works for local Postgres)
function buildSsl() {
	const caPath = process.env.PGSSLROOTCERT; // e.g. "/etc/ssl/certs/rds-ca-global.pem" on Render
	console.log({ caPath });
	if (caPath && existsSync(caPath)) {
		return { ca: readFileSync(caPath, 'utf8') }; // proper verification
	}
	if (process.env.DB_SSL_INSECURE === 'true') {
		return { rejectUnauthorized: false }; // quick unblock for hosted PG w/ unknown CA
	}
	return undefined; // local dev (no SSL)
}

// TEMP singleton pool for testing on app
export const pool = new Pool({
	connectionString: env.DATABASE_URL,
	ssl: buildSsl()
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
