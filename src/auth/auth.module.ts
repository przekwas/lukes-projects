import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { RefreshToken } from './entities/refresh-token.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([RefreshToken]),
		UsersModule,
		JwtModule.register({
			secret: 'someSecretKeyREPLACEFROM_ENV_PLZ',
			signOptions: { expiresIn: '15m' }
		})
	],
	controllers: [AuthController],
	providers: [AuthService]
})
export class AuthModule {}
