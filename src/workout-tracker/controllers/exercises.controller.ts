import { Controller, Get, Post, Patch, Delete, UseGuards, Param, Body, ParseUUIDPipe } from '@nestjs/common';
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
	async findByName(@Param('name') rawName: string) {
        const name = rawName.toLowerCase();
        return this.exercisesService.findByName(name);
    }

	@Get('tag/:tag')
	async findByTag(@Param('tag') rawTag: string) {
        const tag = rawTag.toLowerCase();
        return this.exercisesService.findByTag(tag);
    }

	@Get(':id')
	async getOneById(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.exercisesService.getOneById(id);
    }

	@Post('create')
    @UseGuards(AuthGuard('jwt'))
	async createExercise(@Body() dto: CreateExerciseDto) {
        return this.exercisesService.createExercise(dto);
    }

	@Patch(':id')
    @UseGuards(AuthGuard('jwt'))
	async editExercise(@Param('id', new ParseUUIDPipe()) id: string, @Body() dto: UpdateExerciseDto) {
        return this.exercisesService.editExercise(id, dto);
    }

	@Delete(':id')
    @UseGuards(AuthGuard('jwt'))
	async softDeleteExercise(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.exercisesService.softDeleteExercise(id);
    }
}
