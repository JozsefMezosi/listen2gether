import { Insertable, Selectable } from 'kysely';
import { DB } from 'kysely-codegen';

export type UserTable = DB['users'];
export type NewUser = Insertable<UserTable>;
export type User = Selectable<UserTable>;
