import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import mainConfig from '../config/main.config';
import {
  ApiBody,
  ApiOAuth2,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOAuth2(['login:write'])
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Returns tokens in cookies',
  })
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    console.log(loginDto);
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

    res.json(tokens);
  }
}
