import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { UserModule } from './user/user.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(UserModule), { fallbackOnErrors: true });
  await app.listen(process.env.PORT);
}
bootstrap();
