import { Kysely, sql } from 'kysely';

export const createFriendRequestTable = (db: Kysely<unknown>) =>
  db.schema
    .createTable('friend_request')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('requestor', 'integer', (col) =>
      col.references('user.id').notNull(),
    )
    .addColumn('target_user', 'integer', (col) =>
      col.references('user.id').notNull(),
    )
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();
