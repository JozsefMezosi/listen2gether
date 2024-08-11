import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface FriendRequests {
  created_at: Generated<Timestamp>;
  requestor: number;
  target_user: number;
}

export interface Users {
  email: string;
  id: Generated<number>;
  password: string;
  user_name: string;
}

export interface DB {
  friend_requests: FriendRequests;
  users: Users;
}
