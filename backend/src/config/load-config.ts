import { Config, Environments } from './config.model';
export const loadConfig = (): Config => {
    return {
        DATABASE_URL: process.env.DATABASE_URL,
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_TOKEN_EXP_IN_SECONDS: parseInt(
            process.env.JWT_TOKEN_EXP_IN_SECONDS,
        ),
        PORT: parseInt(process.env.parseInt),
        CLIENT_ID: process.env.CLIENT_ID,
        URL: process.env.URL,
        CLIENT_URL: process.env.CLIENT_URL,
        ENC_IV: process.env.ENC_IV,
        ENC_KEY: process.env.ENC_KEY,
        ENVIRONMENT: process.env.NODE_ENV?.toUpperCase() as Environments,
    };
};
