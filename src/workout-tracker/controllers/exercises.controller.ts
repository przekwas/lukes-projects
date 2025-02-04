import { Controller, Get, Post, Patch, Delete, UseGuards, Param, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExercisesService } from '../services/exercises.service';
import { CreateExerciseDto } from '../dto/create-exercise.dto';
import { UpdateExerciseDto } from '../dto/update-exercise.dto';

@Controller('workout-tracker/exercises')
export class ExercisesController {
	constructor(private readonly exercisesService: ExercisesService) {}

	@Get()
	async getAll() {
        return this.exercisesService.getAll();
    }

	@Get('name/:name')
	async findByName(@Param('name') name: string) {
        return this.exercisesService.findByName(name);
    }

	@Get('tag/:tag')
	async findByTag(@Param('tag') tag: string) {
        return this.exercisesService.findByTag(tag);
    }

	@Get(':id')
	async getOneById(@Param('id') id: string) {
        return this.exercisesService.getOneById(id);
    }

	@Post('create')
    @UseGuards(AuthGuard('jwt'))
	async createExercise(@Body() dto: CreateExerciseDto) {
        return this.exercisesService.createExercise(dto);
    }

	@Patch(':id')
    @UseGuards(AuthGuard('jwt'))
	async editExercise(@Param('id') id: string, @Body() dto: UpdateExerciseDto) {
        return this.exercisesService.editExercise(id, dto);
    }

	@Delete(':id')
    @UseGuards(AuthGuard('jwt'))
	async softDeleteExercise(@Param('id') id: string) {
        return this.exercisesService.softDeleteExercise(id);
    }
}
