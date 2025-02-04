import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutSessionsController } from './controllers/workout-sessions.controller';
import { ExercisesController } from './controllers/exercises.controller';
import { WorkoutSessionsService } from './services/workout-sessions.service';
import { ExercisesService } from './services/exercises.service';
import { User } from '../users/entities/user.entity';
import { WorkoutSession } from './entities/workout-session.entity';
import { Exercise } from './entities/exercise.entity';

@Module({
	imports: [TypeOrmModule.forFeature([WorkoutSession, User, Exercise])],
	controllers: [WorkoutSessionsController, ExercisesController],
	providers: [WorkoutSessionsService, ExercisesService]
})
export class WorkoutTrackerModule {}
