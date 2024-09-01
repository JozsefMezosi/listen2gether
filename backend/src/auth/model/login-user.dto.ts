import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}

export interface UserResponse {
    id: number;

    email: string;
}

export class LoginUserResposne {
    @ApiProperty()
    redirectTo?: string;
}

export interface LoginUserSerivceResponse {
    user: UserResponse;
    access_token: string;
    redirectTo?: string;
}
