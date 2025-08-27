import { Module } from '@nestjs/common';
import { PokeController } from './poke.controller.js';
import { SessionModule } from '../auth/session.module.js';
import { SessionGuard } from '../auth/session.guard.js';

@Module({
	imports: [SessionModule],
	controllers: [PokeController],
	providers: [SessionGuard]
})
export class PokeModule {}
