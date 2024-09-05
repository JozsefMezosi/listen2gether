import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { RoomId } from '../entity/room.entity';

export class CreateRoomDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    public: boolean;
}

export class CreateRoomResponse {
    @ApiProperty()
    id: RoomId;
}
