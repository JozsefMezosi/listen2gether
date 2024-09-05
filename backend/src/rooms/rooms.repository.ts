import { Injectable, NotFoundException } from '@nestjs/common';
import { Database } from 'src/database';
import { NewRoom } from './model/room.model';
import { FindAllRoomDto } from './dto/find-all-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomId } from './entity/room.entity';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'src/common/pipes/constants';

@Injectable()
export class RoomsRepository {
    constructor(@Database() private readonly database: Database) {}
    create(dto: NewRoom) {
        return this.database
            .insertInto('room')
            .values(dto)
            .returning('id')
            .executeTakeFirst();
    }

    find(roomId: RoomId) {
        return this.database
            .selectFrom('room')
            .selectAll()
            .where('id', '=', roomId)
            .executeTakeFirstOrThrow(NotFoundException);
    }

    async isExists(name: string) {
        return Boolean(
            await this.database
                .selectFrom('room')
                .where('name', '=', name)
                .executeTakeFirst(),
        );
    }

    findAll({
        limit = DEFAULT_PAGE_SIZE,
        page = DEFAULT_PAGE,
    }: FindAllRoomDto) {
        return this.database
            .selectFrom('room')
            .selectAll()
            .offset((page - 1) * limit)
            .limit(limit)
            .execute();
    }

    updateOne(id: RoomId, updateRoomDto: UpdateRoomDto) {
        return this.database
            .updateTable('room')
            .where('id', '=', id)
            .set(updateRoomDto)
            .execute();
    }

    deleteOne(id: RoomId) {
        return this.database.deleteFrom('room').where('id', '=', id).execute();
    }
}
