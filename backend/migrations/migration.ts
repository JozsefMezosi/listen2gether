import { Kysely } from 'kysely';
import { createUserTable } from './create-user-table';
import { createFriendRequestTable } from './create-friend-request-table';
import { createFriendTable } from './create-friend-table';

export async function up(db: Kysely<unknown>): Promise<void> {
  await createUserTable(db);
  await createFriendRequestTable(db);
  await createFriendTable(db);
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropTable('user').execute();
  await db.schema.dropTable('friend_request').execute();
  await db.schema.dropTable('friend').execute();
}
