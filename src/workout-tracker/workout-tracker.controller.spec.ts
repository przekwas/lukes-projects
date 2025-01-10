import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutTrackerController } from './workout-tracker.controller';
import { WorkoutTrackerService } from './workout-tracker.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';

describe('WorkoutTrackerController', () => {
	let controller: WorkoutTrackerController;
	let service: WorkoutTrackerService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [WorkoutTrackerController],
			providers: [
				{
					provide: WorkoutTrackerService,
					useValue: {
						findAll: jest.fn().mockReturnValue([
							{ id: 1, name: 'Push Day', exercises: ['Bench Press'] },
							{ id: 2, name: 'Pull Day', exercises: ['Pull-up'] }
						]),
						findOne: jest.fn((id: number) => {
							return { id, name: 'Fake Workout', exercises: [] };
						}),
						create: jest.fn((dto: CreateWorkoutDto) => {
							return { id: 3, ...dto };
						})
					}
				}
			]
		}).compile();

		controller = module.get<WorkoutTrackerController>(WorkoutTrackerController);
		service = module.get<WorkoutTrackerService>(WorkoutTrackerService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	// GET all workouts
	describe('getAllWorkouts', () => {
		it('should return an array of workouts', () => {
			const result = controller.getAllWorkouts();
			expect(result).toEqual([
				{ id: 1, name: 'Push Day', exercises: ['Bench Press'] },
				{ id: 2, name: 'Pull Day', exercises: ['Pull-up'] }
			]);

			expect(service.findAll).toHaveBeenCalledTimes(1);
		});
	});

	// GET one workout by id
	describe('getOneWorkout', () => {
		it('should return a single workout by id', () => {
			const id = '5';
			const result = controller.getOneWorkout(id);
			expect(result).toEqual({ id: 5, name: 'Fake Workout', exercises: [] });

			expect(service.findOne).toHaveBeenCalledWith(5);
		});
	});

	// POST create a workout
	describe('createWorkout', () => {
		it('should create and return a new workout', () => {
			const dto: CreateWorkoutDto = {
				name: 'Leg Day',
				exercises: ['Squat', 'Lunge']
			};

			const result = controller.createWorkout(dto);

			expect(result).toEqual({
				id: 3,
				name: 'Leg Day',
				exercises: ['Squat', 'Lunge']
			});

			expect(service.create).toHaveBeenCalledWith(dto);
		});
	});
});
