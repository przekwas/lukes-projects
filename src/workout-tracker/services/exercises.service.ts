import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from '../entities/exercise.entity';
import { CreateExerciseDto } from '../dto/create-exercise.dto';
import { UpdateExerciseDto } from '../dto/update-exercise.dto';

@Injectable()
export class ExercisesService {
	constructor(
		@InjectRepository(Exercise)
		private readonly exercisesRepo: Repository<Exercise>
	) {}

	async findAll() {
		return 'test0';
	}

	async findByName(name: string) {
		return 'test1 ' + name;
	}

	async findByTag(tag: string) {
		return 'test2 ' + tag;
	}

	async getOneById(id: string) {
		return 'test3 ' + id;
	}

	async createExercise(dto: CreateExerciseDto) {
		return 'test4 ' + JSON.stringify(dto);
	}

	async editExercise(id: string, dto: UpdateExerciseDto) {
		return 'test5 ' + id + ' ' + JSON.stringify(dto);
    }

	async softDeleteExercise(id: string) {
		return 'test6 ' + id;
	}
}
