import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { WorkoutTrackerModule } from './workout-tracker/workout-tracker.module';
import { AuthModule } from './auth/auth.module';

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
		AuthModule,
		WorkoutTrackerModule
	]
})
export class AppModule {}
