import { Controller, Get } from '@nestjs/common';
import { WorkoutSessionsService } from '../services/workout-sessions.service';

@Controller('workout-tracker/workout-sessions')
export class WorkoutSessionsController {
	constructor(private readonly workoutSessionsService: WorkoutSessionsService) {}

	@Get('test')
	async test() {
		return this.workoutSessionsService.test();
	}
}
