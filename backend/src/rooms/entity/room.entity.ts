import { Selectable } from 'kysely';
import { RoomTable } from '../model/room.model';
import { ApiProperty } from '@nestjs/swagger';

export class Room implements Selectable<RoomTable> {
    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    owner_id: number;

    @ApiProperty()
    public: boolean;
}
export type RoomId = Room['id'];
