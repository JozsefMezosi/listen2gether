import { NextFunction, Request, Response } from 'express';
import { NotFound } from '../errors';

export const handleNotFound = (req: Request, _res: Response, next: NextFunction) => {
  next(new NotFound());
};
