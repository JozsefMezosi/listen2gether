import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { userRepository } from '../../user/user.repository';
import { authService } from '../../auth/auth.service';
import { HTTP_STATUS_CODES } from '../model';
import { AUTH_TOKEN, REFRESH_TOKEN } from '../../auth/constants';

const USER_NOT_AUTHENTICATED = 'User not authenticated!';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.cookies[AUTH_TOKEN];
    const user = await authService.getUserFromToken(authToken);
    res.locals.userId = user.id;

    next();
  } catch (error) {
    try {
      const { authToken, user } = await authService.refreshToken(req.cookies?.[REFRESH_TOKEN]);
      res.locals.userId = user.id;
      res.cookie(AUTH_TOKEN, authToken, { httpOnly: true, secure: true });
      next();
    } catch (error) {
      res.status(HTTP_STATUS_CODES.Forbidden).json({ message: USER_NOT_AUTHENTICATED });
    }
  }
};
