import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';

describe('AuthController', () => {
	let authController: AuthController;
	let authService: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [{ provide: AuthService, useValue: { login: jest.fn(), res: jest.fn() } }]
		}).compile();

		authController = module.get<AuthController>(AuthController);
		authService = module.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		expect(authController).toBeDefined();
	});

	describe('POST /auth/login > login()', () => {
		it('should log a user in with valid credentials', async () => {
			const mockLoginDto: LoginDto = {
				email: 'test@test.com',
				password: 'password'
			};

			const mockResult = { message: 'Logged in' };

			(authService.login as jest.Mock).mockResolvedValue(mockResult);

			const mockRes = {
				cookie: jest.fn()
			} as Partial<Response> as Response;

			const result = await authController.login(mockLoginDto, mockRes);

			expect(authService.login).toHaveBeenCalledWith(
				mockLoginDto.email,
				mockLoginDto.password
			);
			expect(result).toEqual(mockResult);
		});

		it('should throw UnauthorizedException if credentials are wrong', async () => {
			const mockLoginDto: LoginDto = {
				email: 'wrong@example.com',
				password: 'badpass'
			};

			(authService.login as jest.Mock).mockRejectedValue(
				new UnauthorizedException('Invalid credentials')
			);

			const mockRes = {
				cookie: jest.fn()
			} as Partial<Response> as Response;

			await expect(authController.login(mockLoginDto, mockRes)).rejects.toThrow(
				UnauthorizedException
			);
			expect(authService.login).toHaveBeenCalledWith(
				mockLoginDto.email,
				mockLoginDto.password
			);
		});

		it('should throw NotFoundException if user not found', async () => {
			const mockLoginDto: LoginDto = {
				email: 'doesnotexist@example.com',
				password: 'somepass'
			};

			(authService.login as jest.Mock).mockRejectedValue(
				new NotFoundException('Invalid credentials')
			);

			const mockRes = {
				cookie: jest.fn()
			} as Partial<Response> as Response;

			await expect(authController.login(mockLoginDto, mockRes)).rejects.toThrow(
				NotFoundException
			);
			expect(authService.login).toHaveBeenCalledWith(
				mockLoginDto.email,
				mockLoginDto.password
			);
		});
	});
});
