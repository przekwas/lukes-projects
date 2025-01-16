import { Controller, Body, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@Get('test')
	test() {
		return this.userService.test();
	}

	@Post('register')
	async register(@Body() createUserDto: CreateUserDto): Promise<User> {
		return this.userService.register(createUserDto);
	}
}
