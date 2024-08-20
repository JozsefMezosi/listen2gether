import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './model/register-user.dto';
import { LoginUserDto, LoginUserResponse } from './model/login-user.dto';
import { ACCESS_TOKEN_KEY } from './constants';
import { ConfigService } from '@nestjs/config';
import { Config } from 'src/config/config.model';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService<Config>,
  ) {}

  @Post('register')
  async registerUser(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<string> {
    await this.authService.registerUser(registerUserDto);
    return 'User created';
  }

  @Post('login')
  async loginUser(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginUserResponse['user']> {
    const { access_token, user } = await this.authService.loginUser(
      loginUserDto,
    );

    response.cookie(ACCESS_TOKEN_KEY, access_token, {
      httpOnly: true,
      maxAge: this.configService.get('JWT_TOKEN_EXP_IN_SECONDS') * 1000,
    });
    return user;
  }
}
