import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/user/model';

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export interface LoginUserResponse {
  user: Pick<User, 'id' | 'email'>;
  access_token: string;
}
