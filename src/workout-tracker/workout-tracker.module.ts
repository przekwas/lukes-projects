import { Module } from '@nestjs/common';
import { WorkoutTrackerController } from './workout-tracker.controller';
import { WorkoutTrackerService } from './workout-tracker.service';

@Module({
	controllers: [WorkoutTrackerController],
	providers: [WorkoutTrackerService]
})
export class WorkoutTrackerModule {}
