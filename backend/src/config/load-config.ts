import { Config } from './config.model';

export const loadConfig = (): Config => {
  return {
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_TOKEN_EXP_IN_SECONDS: parseInt(process.env.JWT_TOKEN_EXP_IN_SECONDS),
    PORT: parseInt(process.env.parseInt),
  };
};
