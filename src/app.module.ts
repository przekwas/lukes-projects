import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { WorkoutTrackerModule } from './workout-tracker/workout-tracker.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DB_HOST,
			port: parseInt(process.env.DB_PORT as string),
			username: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_NAME,
			entities: [__dirname + '/**/*.entity{.ts,.js}'],
			synchronize: true
		}),
		UsersModule,
		AuthModule,
		WorkoutTrackerModule
	]
})
export class AppModule {}