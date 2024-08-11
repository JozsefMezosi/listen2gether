import { Transaction } from 'kysely';
import { DB, db } from '../common';
import { FindFriendRequestParams, FriendRequest, FriendRequestId, FriendRequestParams } from './model';

class FriendRequestRepository {
  createFriendRequest({ targetUserID, userId }: FriendRequestParams) {
    return db.insertInto('friend_request').values({ requestor: userId, target_user: targetUserID }).executeTakeFirst();
  }

  findRequest(params: FindFriendRequestParams): Promise<FriendRequest | undefined> {
    if ('id' in params) {
      return db.selectFrom('friend_request').selectAll().where('id', '=', params.id).executeTakeFirst();
    }
    const { targetUserID, userId } = params;
    return db
      .selectFrom('friend_request')
      .selectAll()
      .where(({ or, eb, and }) =>
        or([
          and([eb('requestor', '=', userId), eb('target_user', '=', targetUserID)]),
          and([eb('requestor', '=', targetUserID), eb('target_user', '=', userId)]),
        ]),
      )
      .executeTakeFirst();
  }

  deleteRequest(id: FriendRequestId, trx?: Transaction<DB>) {
    return (trx ?? db).deleteFrom('friend_request').where('id', '=', id).executeTakeFirst();
  }

  exists(params: FindFriendRequestParams) {
    return this.findRequest(params);
  }
}

export const friendRequestRepository = new FriendRequestRepository();
