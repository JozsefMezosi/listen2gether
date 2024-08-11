import { BadRequest, NotFound } from '../common';
import { userRepository } from '../user/user.repository';
import { friendRequestRepository } from './friend-request.repostiry';
import { FriendRequestParams } from './model/friend-request.model';

class FriendRequestService {
  async createFriendRequest({ targetUserID, userId }: FriendRequestParams) {
    if (targetUserID === userId) {
      throw new BadRequest(`You cannot add yourself as friend.`);
    }

    const targetUserExists = await userRepository.exists({ id: targetUserID });
    if (!targetUserExists) {
      throw new NotFound(`User with id: ${targetUserID} not found.`);
    }

    const isRequestExists = await friendRequestRepository.exists({ targetUserID, userId });
    if (isRequestExists) {
      throw new BadRequest('Friend request already exists.');
    }

    await friendRequestRepository.createFriendRequest({ targetUserID, userId });
  }
}

export const friendRequestService = new FriendRequestService();
