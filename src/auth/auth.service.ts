import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import axios from 'axios';
import { JwtPayload } from './strategies/jwt-access.strategy';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { UsersService } from '../users/users.service';
import * as argon2 from 'argon2';
import { IUserInfo } from './interfaces/user-info.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      const userInfo = await axios
        .get<IUserInfo>('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${loginDto.accessToken}` },
        })
        .then((res) => res.data);

      let user = await this.usersService.getByEmail(userInfo.email);

      if (!user) {
        await this.usersService.create({
          email: userInfo.email,
          firstName: userInfo.given_name,
          lastName: userInfo.family_name,
          photo: userInfo.picture,
        });

        user = await this.usersService.getByEmail(userInfo.email);
      }

      return await this.getTokens({
        sub: user._id.toString(),
        email: user.email,
      });
    } catch (e) {
      if (e?.response?.status && e?.response?.data?.error_description) {
        throw new HttpException(
          e.response.data.error_description,
          e.response.status,
        );
      }

      throw e;
    }
  }

  async logout(id: string): Promise<void> {
    await this.usersService.update(id, { refreshToken: null });
    return;
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.getById(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    return await this.getTokens({
      sub: String(user.id),
      email: user.email,
    });
  }

  async getTokens(payload: JwtPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: jwtConfig().accessSecret,
        expiresIn: jwtConfig().accessExpiresIn,
      }),
      this.jwtService.signAsync(payload, {
        secret: jwtConfig().refreshSecret,
        expiresIn: jwtConfig().refreshExpiresIn,
      }),
    ]);

    await this.usersService.update(payload.sub, {
      refreshToken: await argon2.hash(refreshToken),
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
