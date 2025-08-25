import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class LoginDto {
	@IsEmail() email!: string;
	@IsString() @MinLength(8) password!: string;
	@IsOptional() @IsString() appKey?: string;
}
