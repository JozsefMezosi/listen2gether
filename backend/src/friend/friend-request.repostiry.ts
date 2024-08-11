import { db } from '../common';
import { FriendRequestParams } from './model/friend-request.model';

class FriendRequestRepository {
  createFriendRequest({ targetUserID, userId }: FriendRequestParams) {
    return db.insertInto('friend_requests').values({ requestor: userId, target_user: targetUserID }).executeTakeFirst();
  }

  findRequest({ targetUserID, userId }: FriendRequestParams) {
    return db
      .selectFrom('friend_requests')
      .where(({ or, eb, and }) =>
        or([
          and([eb('requestor', '=', userId), eb('target_user', '=', targetUserID)]),
          and([eb('requestor', '=', targetUserID), eb('target_user', '=', userId)]),
        ]),
      )
      .executeTakeFirst();
  }

  exists(params: FriendRequestParams) {
    return this.findRequest(params);
  }
}

export const friendRequestRepository = new FriendRequestRepository();
