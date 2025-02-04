import { IsOptional, IsString } from 'class-validator';

export class CreateExerciseDto {
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	equipment?: string;

	@IsOptional()
	@IsString()
	tag?: string;
}
