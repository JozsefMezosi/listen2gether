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
    res.send('Friend request sent.');
  }
  async deleteFriendRequest(req: Request, res: Response) {
    await friendRequestService.deleteRequest({ id: parseInt(req.params.id), userId: getUserIdFromResponse(res) });
    res.send('Friend request deleted.');
  }

  async acceptFriendRequest(req: Request, res: Response) {
    await friendRequestService.acceptRequest({ id: parseInt(req.params.id), userId: getUserIdFromResponse(res) });
    res.send('Friend request accepted.');
  }
}

export const friendController = new FriendController();
