import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepo: Repository<User>
	) {}

    test(): string {
        return 'test';
    }

    async register(createUserDto: CreateUserDto): Promise<User> {
        const { email, password, displayName } = createUserDto;

        const existing = await this.usersRepo.findOne({ where: { email }});
        if (existing) {
            throw new BadRequestException('Email is already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = this.usersRepo.create({
            email,
            displayName,
            password: hashedPassword
        });

        return this.usersRepo.save(newUser);
    }
}
