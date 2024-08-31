import 'dotenv/config';
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { DB } from './generated-types';
import { DATABASE_KEY } from './constants';
import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config } from 'src/config/config.model';

export type Database = Kysely<DB>;

export const DatabaseProviders = {
    provide: DATABASE_KEY,
    inject: [ConfigService],
    useFactory: (configService: ConfigService<Config>): Database => {
        return new Kysely<DB>({
            dialect: new PostgresDialect({
                pool: new Pool({
                    connectionString: configService.get('DATABASE_URL'),
                }),
            }),
        });
    },
};

export const Database = () => Inject(DATABASE_KEY);
