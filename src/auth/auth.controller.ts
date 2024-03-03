import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import mainConfig from '../config/main.config';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const tokens = await this.authService.login(loginDto);

    res.cookie('access_token', tokens.accessToken, {
      maxAge: mainConfig().cookiesMaxAge,
      sameSite: true,
      secure: false,
    });

    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: mainConfig().cookiesMaxAge,
      sameSite: true,
      secure: false,
    });
  }
}
