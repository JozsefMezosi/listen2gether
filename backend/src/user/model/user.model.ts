import { Insertable, Selectable } from 'kysely';
import { DB } from 'src/database';

export type UserTable = DB['user'];
export type NewUser = Insertable<UserTable>;
export type User = Selectable<UserTable>;
export type UserId = User['id'];
export type FindUserParams =
    | { email: string; id?: undefined }
    | { email?: undefined; id: UserId };

export interface SetAccessTokenParams {
    userId: UserId;
    token: string;
}

export interface GetSpotifyStateForUserParams {
    state: string;
    userId: UserId;
}
