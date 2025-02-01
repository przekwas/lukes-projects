import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutSessionsController } from './controllers/workout-sessions.controller';
import { WorkoutSessionsService } from './services/workout-sessions.service';
import { WorkoutSession } from './entities/workout-session.entity';
import { User } from '../users/entities/user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([WorkoutSession, User])],
	controllers: [WorkoutSessionsController],
	providers: [WorkoutSessionsService]
})
export class WorkoutTrackerModule {}
