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
			host: 'localhost', // or your IP if remote
			port: 5432, // default PG port
			username: 'postgres', // or your actual username
			password: 'mysecretpass',
			database: 'my_nest_db', // the DB you created
			entities: [__dirname + '/**/*.entity{.ts,.js}'],
			synchronize: true // auto-creates tables in dev
		}),
		,
		UsersModule,
		WorkoutTrackerModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
