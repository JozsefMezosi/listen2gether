import { Selectable } from 'kysely';
import { DB } from '../../common';
import { UserId } from '../../user/model';

export type FriendTable = DB['friend'];
export type Friend = Selectable<FriendTable>;
export type FriendId = Friend['id'];
export interface CreateFriendConnectionProps {
  userId: UserId;
  userTwoId: UserId;
}
