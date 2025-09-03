import { cleanEnv, str, port, num } from 'envalid';

export const env = cleanEnv(process.env, {
	NODE_ENV: str({ choices: ['development', 'test', 'production'], default: 'development' }),
	PORT: port({ default: 3000 }),
	COOKIE_SECRET: str({ default: 'dev-cookie-secret', devDefault: 'dev-cookie-secret' }),
	DATABASE_URL: str(),
	CORS_ORIGINS: str({ default: '' }),
	// 'true' to send SameSite=None
	CROSS_SITE_COOKIES: str({ default: 'false' }),
	RATE_LIMIT_MAX: num({ default: 5 }),
	// fastify-rate-limit format
	RATE_LIMIT_WINDOW: str({ default: '1 minute' })
});

export const isProd = env.NODE_ENV === 'production';
export const isDev = env.NODE_ENV === 'development';
export const crossSite = env.CROSS_SITE_COOKIES.toLowerCase() === 'true';
