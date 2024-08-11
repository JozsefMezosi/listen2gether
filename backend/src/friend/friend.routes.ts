import { Router } from 'express';
import { friendController } from './friend.controller';

export const friendRouter: Router = Router();

friendRouter.post('/add/:userId', friendController.addFriend);
