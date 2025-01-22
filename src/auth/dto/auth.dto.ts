import { IsEmail, IsString } from "class-validator";

export class LoginDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}

export class RefreshDto {
    @IsString()
    refreshToken: string;
}