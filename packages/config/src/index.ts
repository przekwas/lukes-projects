import { cleanEnv, str, port } from 'envalid';

// load and validate process.env
export const env = cleanEnv(process.env, {
	NODE_ENV: str({ choices: ['development', 'test', 'production'], default: 'development' }),
	PORT: port({ default: 3000 }),
	COOKIE_SECRET: str({ default: 'dev-cookie-secret', devDefault: 'dev-cookie-secret' }),
	DATABASE_URL: str()
});

export const isProd = env.NODE_ENV === 'production';
export const isDev = env.NODE_ENV === 'development';
