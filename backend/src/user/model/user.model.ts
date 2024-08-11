import { Insertable, Selectable } from 'kysely';
import { DB } from '../../common';

export type UserTable = DB['user'];
export type NewUser = Insertable<UserTable>;
export type User = Selectable<UserTable>;
export type UserId = User['id'];
export type FindUserParams = { email: string; id?: undefined } | { email?: undefined; id: UserId };
