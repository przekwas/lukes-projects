import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CreateWorkoutDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsArray()
	@IsNotEmpty()
	exercises: string[];
}
