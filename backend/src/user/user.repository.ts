import { Injectable } from '@nestjs/common';
import { Database, Transaction } from 'src/database';
import { NewUser, FindUserParams, SetAccessTokenParams } from './model';

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

    setAccessToken({ token, userId }: SetAccessTokenParams, trx?: Transaction) {
        return (trx || this.database)
            .updateTable('user')
            .set({ access_token: token })
            .where('id', '=', userId)
            .executeTakeFirst();
    }
}
