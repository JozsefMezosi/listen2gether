import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { CONFIG_SCHEMA } from './config/config.schema';
import { loadConfig } from './config/load-config';
import { SpotifyStateModule } from './spotify-state/spotify-state.module';

@Module({
    imports: [
        AuthModule,
        UserModule,
        DatabaseModule,
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: CONFIG_SCHEMA,
            load: [loadConfig],
        }),
        SpotifyStateModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
