import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { WorkoutTrackerModule } from './workout-tracker/workout-tracker.module';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: 'password',
			database: 'lukes_projects',
			entities: [__dirname + '/**/*.entity{.ts,.js}'],
			synchronize: true
		}),
		UsersModule,
		WorkoutTrackerModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
