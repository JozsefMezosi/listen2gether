import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { RoomsRepository } from './rooms.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    controllers: [RoomsController],
    imports: [DatabaseModule],
    providers: [RoomsService, RoomsRepository],
})
export class RoomsModule {}
