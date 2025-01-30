import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreateWorkoutSessionDto } from '../dto/create-workout-session.dto';
import { WorkoutSessionsService } from '../services/workout-sessions.service';

@Controller('workout-tracker/workout-sessions')
@UseGuards(AuthGuard('jwt'))
export class WorkoutSessionsController {
	constructor(private readonly workoutSessionsService: WorkoutSessionsService) {}

	@Post('create')
	async createSession(@Body() dto: CreateWorkoutSessionDto, @Req() req: Request) {
		console.log(req.user);
		return this.workoutSessionsService.createSession();
	}
}
