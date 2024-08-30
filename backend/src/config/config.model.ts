export interface Config {
  DATABASE_URL: string;
  JWT_SECRET: string;
  JWT_TOKEN_EXP_IN_SECONDS: number;
  PORT: number;
  CLIENT_ID: string;
  URL: string;
  CLIENT_URL: string;
  ENC_KEY: string;
  ENC_IV: string;
}
