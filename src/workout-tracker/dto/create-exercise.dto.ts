import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateExerciseDto {
	@IsString()
	@Transform(({ value }) => value?.toLowerCase())
	name: string;

	@IsOptional()
	@IsString()
	@Transform(({ value }) => value?.toLowerCase())
	equipment?: string;

	@IsOptional()
	@IsString()
	@Transform(({ value }) => value?.toLowerCase())
	tag?: string;
}
