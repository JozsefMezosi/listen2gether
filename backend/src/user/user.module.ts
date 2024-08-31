import { Module } from '@nestjs/common';
import { UserRepository } from './user-repository';
import { DatabaseModule } from 'src/database/database.module';
import { IsUserExistsConstraint } from './decorators/is-user-exists';

@Module({
    providers: [UserRepository, IsUserExistsConstraint],
    exports: [UserRepository],
    imports: [DatabaseModule],
})
export class UserModule {}
