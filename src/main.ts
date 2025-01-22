import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix('api');

	app.useGlobalPipes(new ValidationPipe());

	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

	app.use(cookieParser());

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
