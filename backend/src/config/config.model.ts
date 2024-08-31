import { MapKeysToSelf } from 'src/common/model/map-keys-to-self';

export type Environments = 'PROD' | 'DEV';
export const Environments: MapKeysToSelf<Environments> = {
    DEV: 'DEV',
    PROD: 'PROD',
};
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
    ENVIRONMENT: Environments;
}
