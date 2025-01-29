import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutTrackerController } from './workout-tracker.controller';
import { WorkoutTrackerService } from './workout-tracker.service';
import { WorkoutSessionsController } from './controllers/workout-sessions.controller';
import { WorkoutSessionsService } from './services/workout-sessions.service';
import { WorkoutSession } from './entities/workout-session.entity';

@Module({
	imports: [TypeOrmModule.forFeature([WorkoutSession])],
	controllers: [WorkoutTrackerController, WorkoutSessionsController],
	providers: [WorkoutTrackerService, WorkoutSessionsService]
})
export class WorkoutTrackerModule {}
