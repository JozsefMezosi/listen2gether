import { Injectable } from '@nestjs/common';
import { DB, Database } from 'src/database';
import {
    NewUser,
    FindUserParams,
    SetAccessTokenParams,
    SetSpotifyStateParams,
    UserId,
} from './model';
import { Transaction } from 'kysely';

@Injectable()
export class UserRepository {
    constructor(@Database() private readonly database: Database) {}

    createUser(newUser: NewUser) {
        return this.database
            .insertInto('user')
            .values(newUser)
            .executeTakeFirst();
    }

    findUser({ email, id }: FindUserParams) {
        const filterValue = email ?? id;
        return this.database
            .selectFrom('user')
            .selectAll()
            .where(email ? 'email' : 'id', '=', filterValue)
            .executeTakeFirst();
    }
    async exists(params: FindUserParams) {
        return Boolean(await this.findUser(params));
    }

    setAccessToken(
        { token, userId }: SetAccessTokenParams,
        trx?: Transaction<DB>,
    ) {
        return (trx || this.database)
            .updateTable('user')
            .set({ access_token: token })
            .where('id', '=', userId)
            .executeTakeFirst();
    }

    // todo create separate module for spotify state
    setSpotifyState(
        { userId, state }: SetSpotifyStateParams,
        trx?: Transaction<DB>,
    ) {
        return (trx || this.database)
            .insertInto('spotify_state')
            .values({ state, user_id: userId })
            .execute();
    }

    deleteSpotifyState(userId: UserId, trx?: Transaction<DB>) {
        return (trx || this.database)
            .deleteFrom('spotify_state')
            .where('user_id', '=', userId)
            .execute();
    }

    getSpotifyState(state: string) {
        return this.database
            .selectFrom('spotify_state')
            .selectAll()
            .where('state', '=', state)
            .executeTakeFirst();
    }

    async isSpotifyStateExistsForUser(userId: UserId) {
        return Boolean(
            await this.database
                .selectFrom('spotify_state')
                .where('user_id', '=', userId)
                .executeTakeFirst(),
        );
    }
}
