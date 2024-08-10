export interface AuthToken {
  token: string;
  expires: Date;
}
export interface Tokens {
  authToken: AuthToken;
  refreshToken: AuthToken;
}
export interface TokenPayload {
  email: string;
}
