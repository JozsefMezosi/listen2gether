import { Router } from 'express';
import { friendController } from './friend.controller';

export const friendRouter: Router = Router();

friendRouter.post('/add/:userId', friendController.addFriend);
friendRouter.delete('/request/:id', friendController.deleteFriendRequest);
friendRouter.post('/request/:id', friendController.acceptFriendRequest);
