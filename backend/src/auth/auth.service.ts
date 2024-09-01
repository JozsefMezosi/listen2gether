import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as querystring from 'querystring';
import { RegisterUserDto } from './model/register-user.dto';
import { UserRepository } from 'src/user/user.repository';
import { LoginUserDto, LoginUserSerivceResponse } from './model/login-user.dto';
import { HASH_SALT, SCOPES } from './constants';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SetAccessTokenForUserDTO } from './model/set-access-token-for-user.model';
import { UserId } from 'src/user/model';
import { encrypt } from 'src/common/utils/encode-decode';
import { ConfigService } from '@nestjs/config';
import { Config } from 'src/config/config.model';
import { Database } from 'src/database';
import { SpotifyStateRepository } from 'src/spotify-state/spotify-state.repository';
import { generateRandomString } from 'src/common/utils/generate-random-string';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService<Config>,
        private readonly spotifyStateRepository: SpotifyStateRepository,
        @Database() private readonly database: Database,
    ) {}
    async registerUser(registerUserDto: RegisterUserDto) {
        const hashedPassword = await hash(registerUserDto.password, HASH_SALT);
        return this.userRepository.createUser({
            ...registerUserDto,
            password: hashedPassword,
        });
    }

    async loginUser({
        email,
        password,
    }: LoginUserDto): Promise<LoginUserSerivceResponse> {
        const user = await this.userRepository.findUser({ email });

        if (!user || !(await compare(password, user.password))) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, email: user.email };
        const response: LoginUserSerivceResponse = {
            access_token: await this.jwtService.signAsync(payload),
            user: {
                email: user.email,
                id: user.id,
            },
        };

        if (user.access_token) return response;

        const state = await this.getOrCreateSpotifyStateForUser(user.id);

        const client_id = this.configService.get('CLIENT_ID');
        const apiUrl = this.configService.get('URL');

        response.redirectTo = `https://accounts.spotify.com/authorize?${querystring.stringify(
            {
                response_type: 'code',
                client_id: client_id,
                scope: SCOPES,
                redirect_uri: `${apiUrl}/auth/callback`,
                state: state,
            },
        )}`;

        return response;
    }

    async setAccessTokenForUser(
        { code }: SetAccessTokenForUserDTO,
        userId: UserId,
    ) {
        await this.database.transaction().execute(async (trx) => {
            await Promise.all([
                this.userRepository.setAccessToken(
                    {
                        token: encrypt(code),
                        userId,
                    },
                    trx,
                ),
                this.spotifyStateRepository.deleteSpotifyState(userId, trx),
            ]);
        });
    }

    async getOrCreateSpotifyStateForUser(userId: UserId) {
        const stateInDatabase =
            await this.spotifyStateRepository.getSpotifyStateByUserId(userId);
        if (stateInDatabase) return stateInDatabase.state;

        const state = generateRandomString(16);
        await this.spotifyStateRepository.setSpotifyState({
            userId,
            state: encrypt(state),
        });
        return state;
    }

    async getSpotifyStateByState(state: string) {
        return this.spotifyStateRepository.getSpotifyStateByState(
            encrypt(state),
        );
    }
}
