import { Selectable } from 'kysely';
import { UserId } from '../../user/model';
import { DB } from '../../common';

export type FriendRequestTable = DB['friend_request'];
export type FriendRequest = Selectable<FriendRequestTable>;
export type FriendRequestId = FriendRequest['id'];

export interface FriendRequestParams {
  userId: UserId;
  targetUserID: UserId;
}

export type FindFriendRequestParams =
  | FriendRequestParams
  | {
      id: FriendRequestId;
    };

export type ModifyFriendRequestParams = {
  id: FriendRequestId;
  userId: UserId;
};
