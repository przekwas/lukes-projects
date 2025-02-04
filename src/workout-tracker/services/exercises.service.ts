import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Exercise } from '../entities/exercise.entity';
import { CreateExerciseDto } from '../dto/create-exercise.dto';
import { UpdateExerciseDto } from '../dto/update-exercise.dto';

@Injectable()
export class ExercisesService {
	constructor(
		@InjectRepository(Exercise)
		private readonly exercisesRepo: Repository<Exercise>
	) {}

	async getAll(): Promise<Exercise[]> {
		return this.exercisesRepo.find();
	}

	async findByName(name: string) {
		return this.exercisesRepo.find({
			where: { name: ILike(`%${name}%`) }
		});
	}

	async findByTag(tag: string) {
		return this.exercisesRepo.find({
			where: { tag }
		});
	}

	async getOneById(id: string) {
		const exercise = await this.exercisesRepo.findOne({ where: { id } });
		if (!exercise) throw new NotFoundException(`Exercise not found: ${id}`);
		return exercise;
	}

	async createExercise(dto: CreateExerciseDto): Promise<Exercise> {
		const exercise = this.exercisesRepo.create(dto);
		return this.exercisesRepo.save(exercise);
	}

	async editExercise(id: string, dto: UpdateExerciseDto) {
        const exercise = await this.getOneById(id);
        if (dto.name !== undefined) exercise.name = dto.name;
        if (dto.equipment !== undefined) exercise.equipment = dto.equipment;
        if (dto.tag !== undefined) exercise.tag = dto.tag;
    
        return this.exercisesRepo.save(exercise);
	}

	async softDeleteExercise(id: string) {
        const exercise = await this.getOneById(id);
        return this.exercisesRepo.softRemove(exercise);
	}
}
