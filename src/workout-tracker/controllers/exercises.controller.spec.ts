import { Test, TestingModule } from '@nestjs/testing';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from '../services/exercises.service';
import { CreateExerciseDto } from '../dto/create-exercise.dto';
import { UpdateExerciseDto } from '../dto/update-exercise.dto';
import { NotFoundException } from '@nestjs/common';

describe('ExercisesController', () => {
	let controller: ExercisesController;
	let service: ExercisesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ExercisesController],
			providers: [
				{
					provide: ExercisesService,
					useValue: {
						getAll: jest.fn(),
						findByName: jest.fn(),
						findByTag: jest.fn(),
						getOneById: jest.fn(),
						createExercise: jest.fn(),
						editExercise: jest.fn(),
						softDeleteExercise: jest.fn()
					}
				}
			]
		}).compile();

		controller = module.get<ExercisesController>(ExercisesController);
		service = module.get<ExercisesService>(ExercisesService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('GET /workout-tracker/exercises -> getAll()', () => {
		it('should return an array of exercises', async () => {
			const mockExercises = [
				{ id: 'e1', name: 'Bench Press' },
				{ id: 'e2', name: 'Squat' }
			];
			(service.getAll as jest.Mock).mockResolvedValue(mockExercises);

			const result = await controller.getAll();
			expect(service.getAll).toHaveBeenCalled();
			expect(result).toEqual(mockExercises);
		});
	});

	describe('GET /workout-tracker/exercises/name/:name -> findByName()', () => {
		it('should lowercase the param and call service.findByName', async () => {
			(service.findByName as jest.Mock).mockResolvedValue([
				{ id: 'xyz', name: 'Bench Press' }
			]);

			const result = await controller.findByName('BENCH');
			expect(service.findByName).toHaveBeenCalledWith('bench');
			expect(result).toEqual([{ id: 'xyz', name: 'Bench Press' }]);
		});
	});

	describe('GET /workout-tracker/exercises/tag/:tag -> findByTag()', () => {
		it('should lowercase the param and call service.findByTag', async () => {
			(service.findByTag as jest.Mock).mockResolvedValue([{ id: 'xyz', tag: 'pull' }]);

			const result = await controller.findByTag('PULL');
			expect(service.findByTag).toHaveBeenCalledWith('pull');
			expect(result).toEqual([{ id: 'xyz', tag: 'pull' }]);
		});
	});

	describe('GET /workout-tracker/exercises/:id -> getOneById()', () => {
		it('should return one exercise if found', async () => {
			(service.getOneById as jest.Mock).mockResolvedValue({ id: 'abc', name: 'Deadlift' });

			const result = await controller.getOneById('abc');
			expect(service.getOneById).toHaveBeenCalledWith('abc');
			expect(result).toEqual({ id: 'abc', name: 'Deadlift' });
		});

		it('should throw if exercise is not found', async () => {
			(service.getOneById as jest.Mock).mockRejectedValue(new NotFoundException('not found'));

			await expect(controller.getOneById('bad-id')).rejects.toThrow(NotFoundException);
			expect(service.getOneById).toHaveBeenCalledWith('bad-id');
		});
	});

	describe('POST /workout-tracker/exercises/create -> createExercise()', () => {
		it('should create a new exercise', async () => {
			const dto: CreateExerciseDto = {
				name: 'Pullup',
				equipment: 'Bar',
				tag: 'pull'
			};

			(service.createExercise as jest.Mock).mockResolvedValue({
				id: 'ex-123',
				...dto
			});

			const result = await controller.createExercise(dto);

			expect(service.createExercise).toHaveBeenCalledWith(dto);
			expect(result).toEqual({ id: 'ex-123', ...dto });
		});
	});

	describe('PATCH /workout-tracker/exercises/:id -> editExercise()', () => {
		it('should update an exercise', async () => {
			const dto: UpdateExerciseDto = { name: 'Chin-up', tag: 'pull' };
			(service.editExercise as jest.Mock).mockResolvedValue({
				id: 'ex-abc',
				name: 'Chin-up',
				tag: 'pull'
			});

			const result = await controller.editExercise('ex-abc', dto);
			expect(service.editExercise).toHaveBeenCalledWith('ex-abc', dto);
			expect(result).toEqual({ id: 'ex-abc', name: 'Chin-up', tag: 'pull' });
		});
	});

	describe('DELETE /workout-tracker/exercises/:id -> softDeleteExercise()', () => {
		it('should soft delete an exercise', async () => {
			(service.softDeleteExercise as jest.Mock).mockResolvedValue({
				id: 'ex-del',
				name: 'Shoulder Press',
				deletedAt: new Date() // or whichever shape is returned
			});

			const result = await controller.softDeleteExercise('ex-del');
			expect(service.softDeleteExercise).toHaveBeenCalledWith('ex-del');
			expect(result).toEqual({
				id: 'ex-del',
				name: 'Shoulder Press',
				deletedAt: expect.any(Date)
			});
		});
	});
});
