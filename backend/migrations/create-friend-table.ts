import { Kysely, sql } from 'kysely';

export const createFriendTable = (db: Kysely<unknown>) =>
  db.schema
    .createTable('friend')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('user_1', 'integer', (col) =>
      col.references('user.id').notNull(),
    )
    .addColumn('user_2', 'integer', (col) =>
      col.references('user.id').notNull(),
    )
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();
