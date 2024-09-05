import {
    Body,
    Controller,
    Get,
    Post,
    Res,
    Query,
    BadRequestException,
    HttpCode,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { ACCESS_TOKEN_KEY, USER_COOKIE_KEY } from './constants';
import { ConfigService } from '@nestjs/config';
import { Config, Environments } from 'src/config/config.model';
import { CommonApiResponse } from 'src/common/model/common-api-response';
import { Public } from 'src/common/decorators/public.decorator';
import { SetAccessTokenForUserDTO } from './model/set-access-token-for-user.model';
import { ApiResponse } from '@nestjs/swagger';
import { HTTP_STATUS_CODES } from 'src/common/model/http-status-codes';
import { decrypt } from 'src/common/utils/encode-decode';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto, LoginUserResposne } from './dto/login-user.dto';

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
    @HttpCode(HTTP_STATUS_CODES.OK)
    @ApiResponse({
        status: 200,
        description: 'The user data',
        type: LoginUserResposne,
    })
    async loginUser(
        @Body() loginUserDto: LoginUserDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<LoginUserResposne> {
        const { access_token, user, redirectTo } =
            await this.authService.loginUser(loginUserDto);

        const secure =
            this.configService.get('ENVIRONMENT') === Environments.PROD;
        const maxAge =
            this.configService.get('JWT_TOKEN_EXP_IN_SECONDS') * 1000;

        response.cookie(ACCESS_TOKEN_KEY, access_token, {
            httpOnly: true,
            secure,
            maxAge,
        });

        response.cookie(USER_COOKIE_KEY, JSON.stringify(user), {
            secure,
            maxAge,
        });

        return { redirectTo };
    }

    @Public()
    @Get('/callback')
    @ApiResponse({ status: HTTP_STATUS_CODES.OK, type: CommonApiResponse })
    async callback(
        @Query() { state, code }: SetAccessTokenForUserDTO,
        @Res({ passthrough: true }) response: Response,
    ) {
        const stateInDb = await this.authService.getSpotifyStateByState(state);
        if (!stateInDb) throw new BadRequestException();

        const { state: savedState, user_id } = stateInDb;
        if (decrypt(savedState) !== state) throw new BadRequestException();

        await this.authService.setAccessTokenForUser({ code, state }, user_id);
        response.redirect(`${this.configService.get('CLIENT_URL')}/`);
    }
}
