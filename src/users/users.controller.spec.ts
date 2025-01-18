import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

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
						findOneById: jest.fn(),
						register: jest.fn()
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

	describe('GET /users/:id > getUser()', () => {
		it('should return a user if found', async () => {
			const mockUser: User = {
				id: 'user-123',
				email: 'test@example.com',
				displayName: 'TestingUser',
				password: 'hashedpass',
				createdAt: new Date(),
				updatedAt: new Date(),
				deletedAt: null
			};

			(usersService.findOneById as jest.Mock).mockResolvedValue(mockUser);

			const result = await usersController.getUser('user-123');
			expect(result).toEqual(mockUser);
			expect(usersService.findOneById).toHaveBeenCalledWith('user-123');
		});

		it('should throw NotFoundException if a user is not found', async () => {
			(usersService.findOneById as jest.Mock).mockRejectedValue(
				new NotFoundException('User not found')
			);

			await expect(usersController.getUser('bad-id')).rejects.toThrow(NotFoundException);
			expect(usersService.findOneById).toHaveBeenCalledWith('bad-id');
		});
	});

	describe('POST /users/register -> register()', () => {
		it('should create a new user and return it', async () => {
			const dto = {
				email: 'test@example.com',
				password: 'password123',
				displayName: 'TestUser'
			};

			const mockCreatedUser: User = {
				id: 'fake-uuid',
				email: 'test@example.com',
				displayName: 'TestUser',
				password: 'hashedPass',
				createdAt: new Date(),
				updatedAt: new Date(),
				deletedAt: null
			};

			(usersService.register as jest.Mock).mockResolvedValue(mockCreatedUser);

			const result = await usersController.register(dto);
			expect(usersService.register).toHaveBeenCalledWith(dto);
			expect(result).toEqual(mockCreatedUser);
		});

		it('should throw BadRequestException if email is already in use', async () => {
			const dto = {
				email: 'duplicate@example.com',
				password: 'password123',
				displayName: 'DupeUser'
			};

			(usersService.register as jest.Mock).mockRejectedValue(
				new BadRequestException('Email is already in use')
			);

			await expect(usersController.register(dto)).rejects.toThrow(BadRequestException);

			expect(usersService.register).toHaveBeenCalledWith(dto);
		});
	});
});
