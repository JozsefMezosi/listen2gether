import { Kysely, sql } from 'kysely';

export const createRoomTable = (db: Kysely<unknown>) =>
    db.schema
        .createTable('room')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('owner_id', 'integer', (col) =>
            col.notNull().references('user.id'),
        )
        .addColumn('created_at', 'timestamp', (col) =>
            col.defaultTo(sql`now()`).notNull(),
        )
        .addColumn('name', 'varchar', (col) => col.unique().notNull())
        .addColumn('public', 'boolean', (col) => col.notNull())
        .execute();
