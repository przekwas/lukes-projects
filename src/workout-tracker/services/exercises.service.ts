import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from '../entities/exercise.entity';

@Injectable()
export class ExercisesService {
	constructor(
		@InjectRepository(Exercise)
		private readonly exercisesRepo: Repository<Exercise>
	) {}

    async findAll() {
        return 'test0'
    }

    async findByName() {
        return 'test1'
    }

    async findByTag() {
        return 'test2'
    }

    async getOneById() {
        return 'test3'
    }

	async createExercise() {
        return 'test4'
    }

	async editExercise() {
        return 'test5'
    }

	async softDeleteExercise() {
        return 'test6'
    }
}
