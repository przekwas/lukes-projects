import { cleanEnv, str, port } from 'envalid';

// load and validate process.env
export const env = cleanEnv(process.env, {
	NODE_ENV: str({ choices: ['development', 'test', 'production'], default: 'development' }),
	PORT: port({ default: 3000 }),
	COOKIE_SECRET: str(),
	// TEMP until docker pg is ready
	DATABASE_URL: str({
		default: 'postgres://user:pass@localhost:5432/db',
		devDefault: 'postgres://user:pass@localhost:5432/db'
	})
});

export const isProd = env.NODE_ENV === 'production';
export const isDev = env.NODE_ENV === 'development';