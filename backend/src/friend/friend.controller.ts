import { Controller, getUserIdFromResponse } from '../common';
import { Response, Request } from 'express';
import { friendRequestService } from './friend-request.service';
@Controller
class FriendController {
  async addFriend(req: Request, res: Response) {
    await friendRequestService.createFriendRequest({
      targetUserID: parseInt(req.params.userId),
      userId: getUserIdFromResponse(res),
    });
    res.json();
  }
}

export const friendController = new FriendController();
