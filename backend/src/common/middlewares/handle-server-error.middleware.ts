import { NextFunction, Response, Request } from 'express';
import { logger } from '../logger';
import { ApiError, HTTP_STATUS_CODES } from '../model';

export const handleServerError = (error: Error, _: Request, res: Response, next: NextFunction) => {
  console.log({ error });

  res
    .status(error instanceof ApiError ? error.statusCode : HTTP_STATUS_CODES['Internal Server Error'])
    .json({ error: error.message.replaceAll('"', "'") });
  logger.error(error);
  next();
};
