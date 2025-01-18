import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix('api');

	app.useGlobalPipes(new ValidationPipe());

	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

	await app.listen(3000);
}
bootstrap();
