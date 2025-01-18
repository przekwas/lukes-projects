import { Controller, Body, Get, Post, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@Get(':id')
	async getUser(@Param('id') id: string) {
		return this.userService.findOneById(id);
	}

	@Post('register')
	async register(@Body() createUserDto: CreateUserDto): Promise<User> {
		return this.userService.register(createUserDto);
	}
}
