import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { UserModule } from './user/user.module';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ACCESS_TOKEN_KEY } from './auth/constants';
import { UserResponse } from './auth/model/login-user.dto';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            credentials: true,
            origin: process.env.CLIENT_URL,
        },
    });

    const config = new DocumentBuilder()
        .setTitle('Listen2gether')
        .setDescription('Listen2gether api')
        .setVersion('1.0')
        .addTag('cats')
        .addCookieAuth(ACCESS_TOKEN_KEY)
        .build();

    const document = SwaggerModule.createDocument(app, config, {
        deepScanRoutes: true,
        extraModels: [UserResponse],
    });

    SwaggerModule.setup('api', app, document);
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    useContainer(app.select(UserModule), { fallbackOnErrors: true });
    await app.listen(process.env.PORT);
}
bootstrap();
