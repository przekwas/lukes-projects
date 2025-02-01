import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';
import { WorkoutSessionsController } from './workout-sessions.controller';
import { WorkoutSessionsService } from '../services/workout-sessions.service';
import { CreateWorkoutSessionDto } from '../dto/create-workout-session.dto';
import { UpdateWorkoutSessionDto } from '../dto/update-workout-session.dto';

describe('WorkoutSessionsController', () => {
	let controller: WorkoutSessionsController;
	let service: WorkoutSessionsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [WorkoutSessionsController],
			providers: [
				{
					provide: WorkoutSessionsService,
					useValue: {
						createSession: jest.fn(),
						findOne: jest.fn(),
						findAllForUser: jest.fn(),
						updateSession: jest.fn()
					}
				}
			]
		}).compile();

		controller = module.get<WorkoutSessionsController>(WorkoutSessionsController);
		service = module.get<WorkoutSessionsService>(WorkoutSessionsService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('POST /workout-tracker/workout-sessions/create -> createWorkoutSession()', () => {
		it('should create a workout session', async () => {
			const dto: CreateWorkoutSessionDto = {
				sessionDate: '2025-01-31T10:00:00Z',
				location: 'Gym',
				notes: 'Leg day'
			};

			(service.createSession as jest.Mock).mockResolvedValue({
				id: 'fake-uuid',
				user: { id: 'user-123' },
				sessionDate: new Date(dto.sessionDate),
				location: dto.location,
				notes: dto.notes
			});

			const mockReq = {
				user: { userId: 'user-123' }
			} as Partial<Request> as Request;

			const result = await controller.createWorkoutSession(dto, mockReq);

			expect(service.createSession).toHaveBeenCalledWith('user-123', dto);
			expect(result).toEqual({
				id: 'fake-uuid',
				user: { id: 'user-123' },
				sessionDate: expect.any(Date),
				location: 'Gym',
				notes: 'Leg day'
			});
		});
	});

	describe('GET /workout-tracker/workout-sessions/:id -> getWorkoutSession()', () => {
		it('should return a single session if found', async () => {
			(service.findOne as jest.Mock).mockResolvedValue({
				id: 'fake-uuid',
				user: { id: 'user-123' }
			});

			const result = await controller.getWorkoutSession('fake-uuid');
			expect(service.findOne).toHaveBeenCalledWith('fake-uuid');
			expect(result).toEqual({ id: 'fake-uuid', user: { id: 'user-123' } });
		});

		it('should throw NotFoundException if no session found', async () => {
			(service.findOne as jest.Mock).mockRejectedValue(
				new NotFoundException('Workout session not found')
			);

			await expect(controller.getWorkoutSession('bad-uuid')).rejects.toThrow(
				NotFoundException
			);
			expect(service.findOne).toHaveBeenCalledWith('bad-uuid');
		});
	});

	describe('GET /workout-tracker/workout-sessions -> getWorkoutSessionsForUser()', () => {
		it('should return an array of sessions for the user', async () => {
			(service.findAllForUser as jest.Mock).mockResolvedValue([
				{ id: 'session-1' },
				{ id: 'session-2' }
			]);

			const mockReq = {
				user: { userId: 'user-123' }
			} as Partial<Request> as Request;

			const result = await controller.getWorkoutSessionsForUser(mockReq);
			expect(service.findAllForUser).toHaveBeenCalledWith('user-123');
			expect(result).toEqual([{ id: 'session-1' }, { id: 'session-2' }]);
		});
	});

	describe('PATCH /workout-tracker/workout-sessions/:id -> updateWorkoutSession()', () => {
		it('should update a session for the user', async () => {
			const dto: UpdateWorkoutSessionDto = {
				sessionDate: '2025-02-01T09:30:00Z',
				notes: 'updated notes'
			};

			(service.updateSession as jest.Mock).mockResolvedValue({
				id: 'session-1',
				sessionDate: new Date(dto.sessionDate!),
				notes: 'updated notes'
			});

			const mockReq = {
				user: { userId: 'user-123' }
			} as Partial<Request> as Request;

			const result = await controller.updateWorkoutSession('session-1', dto, mockReq);

			expect(service.updateSession).toHaveBeenCalledWith('user-123', 'session-1', dto);
			expect(result).toEqual({
				id: 'session-1',
				sessionDate: expect.any(Date),
				notes: 'updated notes'
			});
		});

		it('should throw ForbiddenException if service rejects', async () => {
			(service.updateSession as jest.Mock).mockRejectedValue(
				new ForbiddenException('You do not own this session')
			);

			const dto: UpdateWorkoutSessionDto = { notes: 'new notes' };
			const mockReq = {
				user: { userId: 'user-123' }
			} as Partial<Request> as Request;

			await expect(
				controller.updateWorkoutSession('session-1', dto, mockReq)
			).rejects.toThrow(ForbiddenException);
			expect(service.updateSession).toHaveBeenCalledWith('user-123', 'session-1', dto);
		});
	});
});
