import { NextFunction, Request, Response } from 'express';
import { ApiError, HTTP_STATUS_CODES } from '../model';

export const handleNotFound = (req: Request, _res: Response, next: NextFunction) => {
  next(new ApiError('Requested resource not found!', HTTP_STATUS_CODES['Not Found']));
};
