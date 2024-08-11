import { BadRequest, NotFound } from '../common';
import { userRepository } from '../user/user.repository';
import { friendRequestRepository } from './friend-request.repository';
import { ModifyFriendRequestParams, FriendRequestParams } from './model';
import { db } from '../common';
import { friendRepository } from './friend.repository';

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

  async deleteRequest({ id, userId }: ModifyFriendRequestParams) {
    const request = await friendRequestRepository.findRequest({ id });
    if (!request) {
      throw new NotFound();
    }

    if (request.requestor !== userId && request.target_user !== userId) {
      throw new BadRequest();
    }

    await friendRequestRepository.deleteRequest(id);
  }

  async acceptRequest({ id, userId }: ModifyFriendRequestParams) {
    const friendRequest = await friendRequestRepository.findRequest({ id });
    if (!friendRequest) {
      throw new NotFound();
    }

    if (friendRequest.target_user !== userId) {
      throw new BadRequest();
    }

    await db.transaction().execute(async (trx) => {
      await Promise.all([
        friendRequestRepository.deleteRequest(id, trx),
        friendRepository.create({ userId: friendRequest.requestor, userTwoId: friendRequest.target_user }, trx),
      ]);
    });
  }
}

export const friendRequestService = new FriendRequestService();
