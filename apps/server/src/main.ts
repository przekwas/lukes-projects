import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import cookie from '@fastify/cookie';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import { ValidationPipe } from '@nestjs/common';
import { env, isProd } from '@lukes-projects/config';
import { closeDb } from '@lukes-projects/db';
import { JsonErrorFilter } from './common/http-exception.filter.js';

// TEMP
// the `@ts-ignore` are because of version mistmatches between nest and fastify
// oh well lol

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter({
			logger: {
				level: isProd ? 'info' : 'debug',
				transport: isProd ? undefined : { target: 'pino-pretty' }
			},
			trustProxy: true
		})
	);

	// cors
	//@ts-ignore
	await app.register(cors, {
		// TEMP update later when deployed
		origin: isProd
			? (process.env.CORS_ORIGINS ?? '')
					.split(',')
					.map(s => s.trim())
					.filter(Boolean)
			: true,
		credentials: true,
		allowedHeaders: ['Content-Type', 'X-CSRF-Token', 'X-App-Key']
	});

	// security headers
	//@ts-ignore
	await app.register(helmet, {
		contentSecurityPolicy: false
	});

	// cookies
	//@ts-ignore
	await app.register(cookie, {
		// set a default secret in dev; override via env in prod
		secret: env.COOKIE_SECRET,
		hook: 'onRequest',
		parseOptions: {
			sameSite: 'lax',
			secure: isProd,
			httpOnly: true
		}
	});

	// rate limit
	//@ts-ignore
	await app.register(rateLimit, {
		max: 5,
		timeWindow: '1 minute',
		hook: 'onRequest',
		keyGenerator: req => req.ip,
		addHeaders: {
			'x-ratelimit-limit': true,
			'x-ratelimit-remaining': true,
			'x-ratelimit-reset': true,
			'retry-after': true
		},
		allowList: (req /*, key*/) => {
			const url = req.url || '';
			return !/^\/api\/v1\/auth\/(login|register)$/.test(url);
		}
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

	// standardized error filter
	app.useGlobalFilters(new JsonErrorFilter());

	// api prefix and shutdown hook
	app.setGlobalPrefix('api/v1');
	app.enableShutdownHooks();

	const fastify = app.getHttpAdapter().getInstance();

	const onClose = async (signal: string) => {
		fastify.log.info(`Received ${signal}, shutting down ...`);
		await closeDb();
		await app.close();
		process.exit(0);
	};
	['SIGINT', 'SIGTERM'].forEach(sig => process.on(sig as NodeJS.Signals, () => onClose(sig)));

	await app.listen({ port: env.PORT, host: '0.0.0.0' });
	fastify.log.info(`🚀 API Dog running on http://localhost:${env.PORT}/api/v1`);
}

bootstrap();
