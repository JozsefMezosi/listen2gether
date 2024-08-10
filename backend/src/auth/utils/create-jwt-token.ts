import { AuthToken, TokenPayload } from '../model';
import jwt from 'jsonwebtoken';

export const createAuthToken = (payload: TokenPayload, now: Date): AuthToken => {
  const jwtExp = parseInt(process.env.JWT_REFRESH_TOKEN_EXP_IN_MILLISECONDS);
  const authToken = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: jwtExp,
    subject: payload.email,
  });

  return { token: authToken, expires: new Date(now.getTime() + jwtExp) };
};
