import { db } from '../common';
import { NewUser } from './model';

class UserRepository {
  createUser(newUser: NewUser) {
    return db.insertInto('users').values(newUser).executeTakeFirst();
  }

  findUser(email: string) {
    return db.selectFrom('users').selectAll().where('email', '=', email).executeTakeFirst();
  }
}

export const userRepository = new UserRepository();
