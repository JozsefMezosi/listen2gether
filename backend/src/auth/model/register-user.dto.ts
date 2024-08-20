import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import {
  IsUserExists,
  ThrowErrorIfUser,
  UserExistsBasedOn,
} from 'src/user/decorators/is-user-exists';

export class RegisterUserDto {
  @IsEmail()
  @IsUserExists({
    throwErrorIfUser: ThrowErrorIfUser.Exists,
    basedOn: UserExistsBasedOn.email,
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'The password must contain at least 8 characters with 1 uppercase letter and 1 number!',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  user_name: string;
}
