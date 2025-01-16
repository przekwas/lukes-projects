import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

describe('UserController', () => {
	let usersController: UsersController;
	let usersService: UsersService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UsersController],
			providers: [
				{
					provide: UsersService,
					useValue: {
						test: jest.fn().mockReturnValue('service test result'),
						register: jest.fn().mockResolvedValue({
							id: 'fake-uuid',
							email: 'test@example.com',
							displayName: 'TestUser'
						} as User)
					}
				}
			]
		}).compile();

		usersController = module.get<UsersController>(UsersController);
		usersService = module.get<UsersService>(UsersService);
	});

	it('should be defined', () => {
		expect(usersController).toBeDefined();
	});
});
