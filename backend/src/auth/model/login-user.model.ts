import { User } from '../../user/model';
import { Tokens } from './auth-token.model';

export interface LoginUserResponse {
  user: Pick<User, 'id' | 'email'>;
  tokens: Tokens;
}
export interface LoginUserRequest {
  email: string;
  password: string;
}
