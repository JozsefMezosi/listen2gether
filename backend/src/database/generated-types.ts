import type { ColumnType } from 'kysely';

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Friend {
  created_at: Generated<Timestamp>;
  id: Generated<number>;
  user_1: number;
  user_2: number;
}

export interface FriendRequest {
  created_at: Generated<Timestamp>;
  id: Generated<number>;
  requestor: number;
  target_user: number;
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
  friend: Friend;
  friend_request: FriendRequest;
  user: User;
}
