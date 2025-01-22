import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { RefreshToken } from './entities/refresh-token.entity';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
	imports: [
		TypeOrmModule.forFeature([RefreshToken]),
		UsersModule,
		JwtModule.register({
			// TODO use env config
			secret: process.env.JWT_SECRET || 'someSecretKeyREPLACEFROM_ENV_PLZ',
			signOptions: { expiresIn: '15m' }
		})
	],
	providers: [AuthService, JwtStrategy],
	controllers: [AuthController]
})
export class AuthModule {}
