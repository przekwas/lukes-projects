import { Module } from '@nestjs/common';
import { PokeController } from './poke.controller.js';

@Module({
	controllers: [PokeController]
})
export class PokeModule {}
