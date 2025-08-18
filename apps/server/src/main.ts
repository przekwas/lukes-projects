import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import cookie from '@fastify/cookie';

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

	await app.register(cookie, {
		// set a default secret in dev; override via env in prod
		secret: 'dev-cookie-secret',
		parseOptions: {}
	});

	// basic health route to prove it’s alive later
	app.getHttpAdapter()
		.getInstance()
		.get('/health', async () => ({ ok: true }));

	const port = Number(process.env.PORT ?? 3000);
	await app.listen({ port, host: '0.0.0.0' });
	// eslint-disable-next-line no-console
	console.log(`Server listening on http://localhost:${port}`);
}

bootstrap();
