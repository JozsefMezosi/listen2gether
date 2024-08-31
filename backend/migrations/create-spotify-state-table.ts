import { Kysely } from 'kysely';

export const createSpotifyStateTable = (db: Kysely<unknown>) =>
    db.schema
        .createTable('spotify_state')
        .addColumn('state', 'varchar', (col) => col.primaryKey())
        .addColumn('user_id', 'integer', (col) =>
            col.references('user.id').unique().notNull(),
        )
        .execute();
