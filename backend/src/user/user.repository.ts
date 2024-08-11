import { db } from '../common';
import { FindUserParams, NewUser } from './model';

class UserRepository {
  createUser(newUser: NewUser) {
    return db.insertInto('users').values(newUser).executeTakeFirst();
  }

  findUser({ email, id }: FindUserParams) {
    const filterValue = email ?? id;
    return db
      .selectFrom('users')
      .selectAll()
      .where(email ? 'email' : 'id', '=', filterValue)
      .executeTakeFirst();
  }
  async exists(params: FindUserParams) {
    return Boolean(await this.findUser(params));
  }
}

export const userRepository = new UserRepository();
