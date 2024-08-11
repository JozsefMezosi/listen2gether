import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .createTable('user')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('email', 'varchar', (col) => col.notNull().unique())
    .addColumn('password', 'varchar', (col) => col.notNull())
    .addColumn('user_name', 'varchar(50)', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .execute();

  await db.schema
    .createTable('friend_request')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('requestor', 'integer', (col) => col.references('user.id').notNull())
    .addColumn('target_user', 'integer', (col) => col.references('user.id').notNull())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .execute();

  await db.schema
    .createTable('friend')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('user_1', 'integer', (col) => col.references('user.id').notNull())
    .addColumn('user_2', 'integer', (col) => col.references('user.id').notNull())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropTable('user').execute();
  await db.schema.dropTable('friend_request').execute();
  await db.schema.dropTable('friend').execute();
}
