import { Unauthorized } from '../common';
import { userRepository } from '../user/user.repository';
import { HASH_SALT } from './constants';
import { LoginUserRequest, LoginUserResponse } from './model';
import jwt from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';
import { createAuthTokens } from './utils';
import { NewUser } from '../user/model';
import { validateUserRegistrationData } from './validators';
import { createAuthToken } from './utils/create-jwt-token';

class AuthService {
  async registerUser({ password, ...restUser }: NewUser) {
    await validateUserRegistrationData({ password, ...restUser });
    const hashedPassword = await hash(password, HASH_SALT);

    await userRepository.createUser({ ...restUser, password: hashedPassword });
  }

  async loginUser({ email, password }: LoginUserRequest): Promise<LoginUserResponse> {
    const user = await userRepository.findUser({ email });

    if (!user) {
      throw new Unauthorized();
    }

    if (!(await compare(password, user.password))) {
      throw new Unauthorized();
    }

    return {
      tokens: createAuthTokens({ email }),
      user: { email: user.email, id: user.id },
    };
  }

  async getUserFromToken(token: string | undefined) {
    if (!token) {
      throw new Unauthorized();
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof payload === 'string') {
      throw new Unauthorized();
    }

    const user = await userRepository.findUser({ email: payload.email });

    if (!user) {
      throw new Unauthorized();
    }

    return user;
  }
  async refreshToken(refreshToken: string | undefined) {
    const user = await this.getUserFromToken(refreshToken);
    return {
      authToken: createAuthToken({ email: user.email }, new Date()),
      user,
    };
  }
}
export const authService = new AuthService();
