import { IsNotEmpty, IsString } from 'class-validator';

export class SetAccessTokenForUserDTO {
  @IsString()
  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  @IsString()
  code: string;
}
