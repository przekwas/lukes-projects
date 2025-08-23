import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { env } from '@lukes-projects/config';
import * as schema from './schema.js';

const ssl =
	process.env.DB_SSL_INSECURE === 'true'
		? { rejectUnauthorized: false }
		: /(?:[?&])ssl(true|=true|mode=require)\b/i.test(env.DATABASE_URL)
		? true
		: undefined;

export const pool = new Pool({ connectionString: env.DATABASE_URL, ssl });
export const db = drizzle(pool, { schema });

export async function closeDb() {
	await pool.end();
}
