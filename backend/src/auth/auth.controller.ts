import { Body, Controller, Get, Post, Res, Query } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './model/register-user.dto';
import { LoginUserDto, LoginUserResponse } from './model/login-user.dto';
import { ACCESS_TOKEN_KEY, SCOPES } from './constants';
import { ConfigService } from '@nestjs/config';
import { Config } from 'src/config/config.model';
import { CommonApiResponse } from 'src/common/model/common-api-response';
import { generateRandomString } from 'src/common/utils/generate-random-string';
import * as querystring from 'querystring';
import { Public } from 'src/common/decorators/public.decorator';
import { UserIdentifier } from 'src/common/decorators/user-identifier.decorator';
import { UserId } from 'src/user/model';
import { SetAccessTokenForUserDTO } from './model/set-access-token-for-user.model';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService<Config>,
  ) {}
  @Public()
  @Post('register')
  async registerUser(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<CommonApiResponse> {
    await this.authService.registerUser(registerUserDto);
    return { payload: 'User created' };
  }

  @Public()
  @Post('login')
  async loginUser(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ redirectTo?: string; user: LoginUserResponse['user'] }> {
    const { access_token, user, spotifyAccessTokenFilled } =
      await this.authService.loginUser(loginUserDto);

    response.cookie(ACCESS_TOKEN_KEY, access_token, {
      httpOnly: true,
      maxAge: this.configService.get('JWT_TOKEN_EXP_IN_SECONDS') * 1000,
    });

    console.log({ spotifyAccessTokenFilled });

    if (!spotifyAccessTokenFilled) {
      const state = generateRandomString(16);
      const client_id = this.configService.get('CLIENT_ID');
      const apiUrl = this.configService.get('URL');
      response.redirect(
        `https://accounts.spotify.com/authorize?${querystring.stringify({
          response_type: 'code',
          client_id: client_id,
          scope: SCOPES,
          redirect_uri: `${apiUrl}/auth/callback`,
          state: state,
        })}`,
      );
      return;
    }
    return { user };
  }

  @Get('/callback')
  async callback(
    @Query() { state, code }: SetAccessTokenForUserDTO,
    @UserIdentifier() userId: UserId,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log({ asd: this.configService.get('CLIENT_URL') });
    await this.authService.setAccessTokenForUser({ code, state }, userId);
    response.redirect(`${this.configService.get('CLIENT_URL')}/`);
  }
}
