import { Kysely, sql } from 'kysely';

export const createUserTable = (db: Kysely<unknown>) =>
    db.schema
        .createTable('user')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('email', 'varchar', (col) => col.notNull().unique())
        .addColumn('password', 'varchar', (col) => col.notNull())
        .addColumn('user_name', 'varchar(50)', (col) => col.notNull())
        .addColumn('access_token', 'varchar')
        .addColumn('created_at', 'timestamp', (col) =>
            col.defaultTo(sql`now()`).notNull(),
        )
        .execute();
