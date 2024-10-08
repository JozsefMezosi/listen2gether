import type { ColumnType } from 'kysely';

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Room {
    created_at: Generated<Timestamp>;
    id: Generated<number>;
    name: string;
    owner_id: number;
    public: boolean;
}

export interface SpotifyState {
    state: string;
    user_id: number;
}

export interface User {
    access_token: string | null;
    created_at: Generated<Timestamp>;
    email: string;
    id: Generated<number>;
    password: string;
    user_name: string;
}

export interface DB {
    room: Room;
    spotify_state: SpotifyState;
    user: User;
}
