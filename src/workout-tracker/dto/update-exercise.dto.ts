import { IsOptional, IsString } from 'class-validator';

export class UpdateExerciseDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    equipment?: string;

    @IsOptional()
    @IsString()
    tag?: string;
}
