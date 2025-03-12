import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutSessionsController } from './controllers/workout-sessions.controller';
import { ExercisesController } from './controllers/exercises.controller';
import { SessionExercisesController } from './controllers/session-exercises.controller';
import { WorkoutSessionsService } from './services/workout-sessions.service';
import { ExercisesService } from './services/exercises.service';
import { SessionExercisesService } from './services/session-exercises.service';
import { User } from '../users/entities/user.entity';
import { WorkoutSession } from './entities/workout-session.entity';
import { Exercise } from './entities/exercise.entity';
import { SessionExercise } from './entities/session-exercise.entity';

@Module({
	imports: [TypeOrmModule.forFeature([WorkoutSession, User, Exercise, SessionExercise])],
	controllers: [WorkoutSessionsController, ExercisesController, SessionExercisesController],
	providers: [WorkoutSessionsService, ExercisesService, SessionExercisesService]
})
export class WorkoutTrackerModule {}
