import { UserId } from '../../user/model';

export interface FriendRequestParams {
  userId: UserId;
  targetUserID: UserId;
}
