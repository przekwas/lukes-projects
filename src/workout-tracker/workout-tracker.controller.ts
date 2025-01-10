import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { WorkoutTrackerService } from './workout-tracker.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { HardcodedGuard } from 'src/auth/guards/hardcoded.guard';

@Controller('workouts-tracker')
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
	@UseGuards(HardcodedGuard)
	createWorkout(@Body() dto: CreateWorkoutDto) {
		return this.workoutService.create(dto);
	}
}
