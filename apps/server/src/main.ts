import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import cookie from '@fastify/cookie';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import { ValidationPipe } from '@nestjs/common';
import { env, isProd } from '@lukes-projects/config';

// TEMP
// the `as any` type casts are because of version mistmatches between nest and fastify
// oh well lol

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter({
			logger: {
				level: isProd ? 'info' : 'debug',
				transport: isProd ? undefined : { target: 'pino-pretty' }
			}
		})
	);

	// security headers
	await app.register(helmet as any, {
		contentSecurityPolicy: false
	});

	// cors
	// TEMP update later when deployed
	await app.register(cors as any, {
		origin: isProd ? ['http://lukes-projects.com'] : true,
		credentials: true
	});

	// cookies
	await app.register(cookie as any, {
		// set a default secret in dev; override via env in prod
		secret: env.COOKIE_SECRET
	});

	// global validation and transform for dtos
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
			transformOptions: { enableImplicitConversion: true }
		})
	);

	// api prefix and shutdown hook
	app.setGlobalPrefix('api');
	app.enableShutdownHooks();

	await app.listen({ port: env.PORT, host: '0.0.0.0' });
	const fastify = app.getHttpAdapter().getInstance();
	fastify.log.info(`🚀 API Dog running on http://localhost:${env.PORT}/api`);
}

bootstrap();
