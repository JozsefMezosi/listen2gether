import {
    Body,
    Controller,
    Get,
    Post,
    Res,
    Query,
    BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './model/register-user.dto';
import { LoginUserDto, LoginUserResponseUser } from './model/login-user.dto';
import { ACCESS_TOKEN_KEY, SCOPES } from './constants';
import { ConfigService } from '@nestjs/config';
import { Config, Environments } from 'src/config/config.model';
import { CommonApiResponse } from 'src/common/model/common-api-response';
import { generateRandomString } from 'src/common/utils/generate-random-string';
import * as querystring from 'querystring';
import { Public } from 'src/common/decorators/public.decorator';
import { SetAccessTokenForUserDTO } from './model/set-access-token-for-user.model';
import { ApiResponse } from '@nestjs/swagger';
import { HTTP_STATUS_CODES } from 'src/common/model/http-status-codes';
import { decrypt } from 'src/common/utils/encode-decode';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService<Config>,
    ) {}
    @Public()
    @Post('register')
    @ApiResponse({ status: 200, type: CommonApiResponse })
    async registerUser(
        @Body() registerUserDto: RegisterUserDto,
    ): Promise<CommonApiResponse> {
        await this.authService.registerUser(registerUserDto);
        return new CommonApiResponse('User created');
    }

    @Public()
    @Post('login')
    @ApiResponse({
        status: 200,
        description: 'The user data',
        type: LoginUserResponseUser,
    })
    async loginUser(
        @Body() loginUserDto: LoginUserDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<LoginUserResponseUser> {
        const { access_token, user, spotifyAccessTokenFilled } =
            await this.authService.loginUser(loginUserDto);

        response.cookie(ACCESS_TOKEN_KEY, access_token, {
            httpOnly: true,
            secure: this.configService.get('ENVIRONMENT') === Environments.PROD,
            maxAge: this.configService.get('JWT_TOKEN_EXP_IN_SECONDS') * 1000,
        });

        if (spotifyAccessTokenFilled) {
            return user;
        }

        const state = generateRandomString(16);
        await this.authService.saveSpotifyState({
            state: state,
            userId: user.id,
        });
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
    }

    @Public()
    @Get('/callback')
    @ApiResponse({ status: HTTP_STATUS_CODES.OK, type: CommonApiResponse })
    async callback(
        @Query() { state, code }: SetAccessTokenForUserDTO,
        @Res({ passthrough: true }) response: Response,
    ) {
        const stateInDb = await this.authService.getSpotifyState(state);
        if (!stateInDb) throw new BadRequestException();
        const { state: savedState, user_id } = stateInDb;
        if (decrypt(savedState) !== state) throw new BadRequestException();
        await this.authService.setAccessTokenForUser({ code, state }, user_id);
        response.redirect(`${this.configService.get('CLIENT_URL')}/`);
    }
}
