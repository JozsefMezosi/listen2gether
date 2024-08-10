import jwt from 'jsonwebtoken';
import { TokenPayload, Tokens } from '../model';
import { createAuthToken } from './create-jwt-token';
export const createAuthTokens = (payload: TokenPayload): Tokens => {
  const now = new Date();
  const refreshExp = parseInt(process.env.JWT_TOKEN_EXP_IN_MILLISECONDS);

  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: refreshExp,
    subject: payload.email,
  });

  return {
    refreshToken: { token: refreshToken, expires: new Date(now.getTime() + refreshExp) },
    authToken: createAuthToken(payload, now),
  };
};
