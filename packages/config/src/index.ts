import { cleanEnv, str, port, url } from 'envalid';

// load and validate process.env
export const env = cleanEnv(process.env, {
	NODE_ENV: str({ choices: ['development', 'test', 'productions'], default: 'development' }),
	PORT: port({ default: 3000 }),
	COOKIE_SECRET: str()
});
