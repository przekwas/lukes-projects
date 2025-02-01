import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkoutSession } from '../entities/workout-session.entity';
import { User } from '../../users/entities/user.entity';
import { CreateWorkoutSessionDto } from '../dto/create-workout-session.dto';
import { UpdateWorkoutSessionDto } from '../dto/update-workout-session.dto';

@Injectable()
export class WorkoutSessionsService {
	constructor(
		@InjectRepository(WorkoutSession)
		private readonly workoutSessionsRepo: Repository<WorkoutSession>,

		@InjectRepository(User)
		private readonly userRepo: Repository<User>
	) {}

	async createSession(userId: string, dto: CreateWorkoutSessionDto) {
		const user = await this.userRepo.findOne({ where: { id: userId } });
		if (!user) {
			throw new NotFoundException(`User not found for id: ${userId}`);
		}

		const session = this.workoutSessionsRepo.create({
			user,
			sessionDate: new Date(dto.sessionDate),
			location: dto.location,
			notes: dto.notes
		});

		return this.workoutSessionsRepo.save(session);
	}

	async findOne(id: string): Promise<WorkoutSession> {
		const workoutSession = await this.workoutSessionsRepo.findOne({ where: { id } });
		if (!workoutSession) {
			throw new NotFoundException(`Workout session not found with id: ${id}`);
		}
		return workoutSession;
	}

	async findAllForUser(userId: string): Promise<WorkoutSession[]> {
		const workoutSessionsForUser = await this.workoutSessionsRepo.find({
			where: { user: { id: userId } }
		});
		return workoutSessionsForUser;
	}

	async updateSession(userId: string, sessionId: string, dto: UpdateWorkoutSessionDto): Promise<WorkoutSession> {
		const session = await this.workoutSessionsRepo.findOne({
			where: { id: sessionId },
			relations: ['user']
		});

		if (!session) {
			throw new NotFoundException(`Session not found for id: ${sessionId}`);
		}

		if (session.user && session.user.id !== userId) {
			throw new ForbiddenException('You do not own this session');
		}

		if (dto.sessionDate !== undefined) {
			session.sessionDate = new Date(dto.sessionDate);
		}
		if (dto.location !== undefined) {
			session.location = dto.location;
		}
		if (dto.notes !== undefined) {
			session.notes = dto.notes;
		}

		return this.workoutSessionsRepo.save(session);
	}
}
