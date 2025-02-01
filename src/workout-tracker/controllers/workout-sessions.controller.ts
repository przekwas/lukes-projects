import {
	Body,
	Controller,
	Get,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
	Req,
	UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { WorkoutSessionsService } from '../services/workout-sessions.service';
import { CreateWorkoutSessionDto } from '../dto/create-workout-session.dto';
import { UpdateWorkoutSessionDto } from '../dto/update-workout-session.dto';

@Controller('workout-tracker/workout-sessions')
// non-null assertion since UseGuard should gaurentee user is populated
@UseGuards(AuthGuard('jwt'))
export class WorkoutSessionsController {
	constructor(private readonly workoutSessionsService: WorkoutSessionsService) {}

	@Post('create')
	async createWorkoutSession(@Body() dto: CreateWorkoutSessionDto, @Req() req: Request) {
		const userId = req.user!.userId;
		return this.workoutSessionsService.createSession(userId, dto);
	}

	@Get(':id')
	async getWorkoutSession(@Param('id', new ParseUUIDPipe()) id: string) {
		return this.workoutSessionsService.findOne(id);
	}

	@Get()
	async getWorkoutSessionsForUser(@Req() req: Request) {
		const userId = req.user!.userId;
		return this.workoutSessionsService.findAllForUser(userId);
	}

	@Patch(':id')
	async updateWorkoutSession(
		@Param('id', new ParseUUIDPipe()) sessionId: string,
		@Body() dto: UpdateWorkoutSessionDto,
		@Req() req: Request
	) {
		const userId = req.user!.userId;
		return this.workoutSessionsService.updateSession(userId, sessionId, dto);
	}
}
