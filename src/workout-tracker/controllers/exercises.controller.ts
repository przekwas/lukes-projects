import { Controller, Get, Post, Patch, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExercisesService } from '../services/exercises.service';

@Controller('workout-tracker/exercises')
@UseGuards(AuthGuard('jwt'))
export class ExercisesController {
	constructor(private readonly exercisesService: ExercisesService) {}

	@Get()
	async findAll() {}

	@Get()
	async findByName() {}

	@Get()
	async findByTag() {}

	@Get()
	async getOneByTag() {}

	@Post()
	async createExercise() {}

	@Patch()
	async editExercise() {}

	@Delete()
	async softDeleteExercise() {}
}
