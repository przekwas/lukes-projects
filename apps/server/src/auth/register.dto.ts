import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
	@IsEmail() email!: string;
	@IsString() @MinLength(8) @MaxLength(100) password!: string;
	@IsString() @MinLength(2) @MaxLength(120) displayName!: string;
	@IsOptional() @IsString() appKey: string;
}
