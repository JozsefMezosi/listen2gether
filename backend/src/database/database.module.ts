import { Module } from '@nestjs/common';
import { DatabaseProviders } from './database';

@Module({ providers: [DatabaseProviders], exports: [DatabaseProviders] })
export class DatabaseModule {}
