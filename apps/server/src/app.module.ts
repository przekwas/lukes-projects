import 'reflect-metadata';

import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module.js';
import { AuthModule } from './auth/auth.module.js';
// TEMP test
import { PokeModule } from './poke/poke.module.js';

@Module({
	imports: [HealthModule, PokeModule, AuthModule]
})
export class AppModule {}
