import { Injectable } from '@nestjs/common';
import { Database, Transaction } from 'src/database';
import { GetSpotifyStateForUserParams, UserId } from 'src/user/model';

@Injectable()
export class SpotifyStateRepository {
    constructor(@Database() private readonly database: Database) {}

    setSpotifyState(
        { userId, state }: GetSpotifyStateForUserParams,
        trx?: Transaction,
    ) {
        return (trx || this.database)
            .insertInto('spotify_state')
            .values({ state, user_id: userId })
            .execute();
    }

    deleteSpotifyState(userId: UserId, trx?: Transaction) {
        return (trx || this.database)
            .deleteFrom('spotify_state')
            .where('user_id', '=', userId)
            .execute();
    }

    getSpotifyStateByState(state: string) {
        return this.database
            .selectFrom('spotify_state')
            .selectAll()
            .where('state', '=', state)
            .executeTakeFirst();
    }

    getSpotifyStateByUserId(userId: UserId) {
        return this.database
            .selectFrom('spotify_state')
            .select('state')
            .where('user_id', '=', userId)
            .executeTakeFirst();
    }
}
