import * as Joi from 'joi';
import { Config } from './config.model';

export const CONFIG_SCHEMA = Joi.object<Config>({
    DATABASE_URL: Joi.string().not().empty(),
    JWT_SECRET: Joi.string().not().empty(),
    JWT_TOKEN_EXP_IN_SECONDS: Joi.number().min(1),
    PORT: Joi.number().port().default(3001),
    CLIENT_ID: Joi.string().not().empty(),
    URL: Joi.string().not().empty(),
    CLIENT_URL: Joi.string().not().empty(),
    ENC_IV: Joi.string().not().empty(),
    ENC_KEY: Joi.string().not().empty(),
    ENVIRONMENT: Joi.string().valid('PROD', 'DEV'),
});
