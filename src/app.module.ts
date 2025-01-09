import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkoutTrackerModule } from './workout-tracker/workout-tracker.module';

@Module({
	imports: [WorkoutTrackerModule],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
