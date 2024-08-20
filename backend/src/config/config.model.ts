export interface Config {
  DATABASE_URL: string;
  JWT_SECRET: string;
  JWT_TOKEN_EXP_IN_SECONDS: number;
  PORT: number;
}
