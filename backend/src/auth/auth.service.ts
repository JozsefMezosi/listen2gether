import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from './model/register-user.dto';
import { UserRepository } from 'src/user/user-repository';
import { LoginUserDto, LoginUserResponse } from './model/login-user.dto';
import { HASH_SALT } from './constants';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SetAccessTokenForUserDTO } from './model/set-access-token-for-user.model';
import { SetSpotifyStateParams, UserId } from 'src/user/model';
import { encrypt } from 'src/common/utils/encode-decode';
import { getExprationDate } from './utils/get-expiration-date';
import { ConfigService } from '@nestjs/config';
import { Config } from 'src/config/config.model';
import { Database } from 'src/database';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService<Config>,
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
    }: LoginUserDto): Promise<LoginUserResponse> {
        const user = await this.userRepository.findUser({ email });

        if (!user) {
            throw new UnauthorizedException();
        }

        if (!(await compare(password, user.password))) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, email: user.email };
        return {
            spotifyAccessTokenFilled: Boolean(user.access_token),
            access_token: await this.jwtService.signAsync(payload),
            user: {
                expires: getExprationDate(
                    this.configService.get('JWT_TOKEN_EXP_IN_SECONDS'),
                ),
                email: user.email,
                id: user.id,
            },
        };
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
                this.userRepository.deleteSpotifyState(userId, trx),
            ]);
        });
    }

    async saveSpotifyState({ state, userId }: SetSpotifyStateParams) {
        const exists = await this.userRepository.isSpotifyStateExistsForUser(
            userId,
        );
        if (exists) return;
        await this.userRepository.setSpotifyState({
            userId,
            state: encrypt(state),
        });
    }

    async getSpotifyState(state: string) {
        return this.userRepository.getSpotifyState(encrypt(state));
    }
}
