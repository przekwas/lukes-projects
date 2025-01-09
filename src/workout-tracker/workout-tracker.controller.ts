import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { WorkoutTrackerService } from './workout-tracker.service';

@Controller('workouts')
export class WorkoutTrackerController {
	constructor(private readonly workoutService: WorkoutTrackerService) {}

	@Get()
	getAllWorkouts() {
		return this.workoutService.findAll();
	}

	@Get(':id')
	getOneWorkout(@Param('id') id: string) {
		return this.workoutService.findOne(Number(id));
	}

	@Post()
	createWorkout(@Body() body: { name: string; exercises: string[] }) {
		return this.workoutService.create(body);
	}
}
