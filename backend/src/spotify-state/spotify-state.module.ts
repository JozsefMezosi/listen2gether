import { Module } from '@nestjs/common';
import { SpotifyStateRepository } from './spotify-state.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule],
    providers: [SpotifyStateRepository],
    exports: [SpotifyStateRepository],
})
export class SpotifyStateModule {}
