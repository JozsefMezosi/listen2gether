import { Response } from 'express';
import { Unauthorized } from '..';

export const getUserIdFromResponse = (res: Response) => {
  const userId = res.locals.userId;
  if (!userId) {
    throw new Unauthorized();
  }

  return userId;
};
