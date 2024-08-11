import { Transaction } from 'kysely';
import { DB, db } from '../common';
import { CreateFriendConnectionProps } from './model';

class FriendRepository {
  create({ userId, userTwoId }: CreateFriendConnectionProps, trx?: Transaction<DB>) {
    return (trx || db).insertInto('friend').values({ user_1: userId, user_2: userTwoId }).executeTakeFirstOrThrow();
  }
}

export const friendRepository = new FriendRepository();
