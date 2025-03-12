import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionExercise } from '../entities/session-exercise.entity';

@Injectable()
export class SessionExercisesService {
	constructor(
		@InjectRepository(SessionExercise)
		private readonly sessionExercisesRepo: Repository<SessionExercise>
	) {}

	async getAll() {
		return 'test';
	}
}
