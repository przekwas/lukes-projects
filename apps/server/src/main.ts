import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import cookie from '@fastify/cookie';

// import env from config package
import { env } from '@lukes-projects/config';

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

	// current type mismatch between nest and fastify cookies
	// don't care enough to clear it atm
	//@ts-ignore
	await app.register(cookie, {
		// set a default secret in dev; override via env in prod
		secret: env.COOKIE_SECRET,
		parseOptions: {}
	});

	// basic health route to prove it’s alive later
	app.getHttpAdapter()
		.getInstance()
		.get('/health', async () => ({ ok: true, env: env.NODE_ENV }));

	await app.listen({ port: env.PORT, host: '0.0.0.0' });
	// eslint-disable-next-line no-console
	console.log(`Server listening on http://localhost:${env.PORT}`);
}

bootstrap();
