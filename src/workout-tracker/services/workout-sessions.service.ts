import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkoutSession } from '../entities/workout-session.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkoutSessionsService {
	constructor(
		@InjectRepository(WorkoutSession)
		private readonly workoutSessionsRepo = Repository<WorkoutSession>
	) {}

    createSession(): string {
        return 'test';
    }
}
