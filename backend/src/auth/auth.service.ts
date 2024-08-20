import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from './model/register-user.dto';
import { UserRepository } from 'src/user/user-repository';
import { LoginUserDto, LoginUserResponse } from './model/login-user.dto';
import { HASH_SALT } from './constants';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
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
      access_token: await this.jwtService.signAsync(payload),
      user: { email: user.email, id: user.id },
    };
  }
}
