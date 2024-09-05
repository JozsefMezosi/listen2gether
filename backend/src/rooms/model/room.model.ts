import { Insertable } from 'kysely';
import { DB } from 'src/database';

export type RoomTable = DB['room'];
export type NewRoom = Omit<Insertable<RoomTable>, 'created_at' | 'id'>;
