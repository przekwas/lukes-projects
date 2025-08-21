import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module.js';
// TEMP test
import { PokeModule } from './poke/poke.module.js';

@Module({
	imports: [HealthModule, PokeModule],
	controllers: [],
	providers: []
})
export class AppModule {}
