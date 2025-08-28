import 'reflect-metadata';

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HealthModule } from './health/health.module.js';
import { AuthModule } from './auth/auth.module.js';
import { CsrfMiddleware } from './security/csrf.middleware.js';
// TEMP test
import { PokeModule } from './poke/poke.module.js';

@Module({
	imports: [HealthModule, PokeModule, AuthModule]
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(CsrfMiddleware).forRoutes('*');
	}
}
