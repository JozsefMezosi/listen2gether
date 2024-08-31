import { Kysely } from 'kysely';
import { createUserTable } from './create-user-table';
import { createSpotifyStateTable } from './create-spotify-state-table';

export async function up(db: Kysely<unknown>): Promise<void> {
    await createUserTable(db);
    await createSpotifyStateTable(db);
}

export async function down(db: Kysely<unknown>): Promise<void> {
    await db.schema.dropTable('user').execute();
    await db.schema.dropTable('spotify_state').execute();
}
