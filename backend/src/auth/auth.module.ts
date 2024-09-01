import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { DatabaseModule } from 'src/database/database.module';
import { SpotifyStateModule } from 'src/spotify-state/spotify-state.module';
@Module({
    imports: [
        DatabaseModule,
        SpotifyStateModule,
        UserModule,
        ConfigModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: `${
                    parseInt(process.env.JWT_TOKEN_EXP_IN_SECONDS) / 3600
                }h`,
            },
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class AuthModule {}
