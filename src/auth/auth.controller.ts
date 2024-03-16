import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request, Response } from 'express';
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
import { JwtAccessAuthGuard } from './guards/jwt-access-auth.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';

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

  @Get('logout')
  @UseGuards(JwtAccessAuthGuard)
  async logout(@Req() req: Request) {
    return await this.authService.logout(req.user['sub']);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Get('refresh')
  async refreshTokens(@Req() req: Request, @Res() res: Response) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    const tokens = await this.authService.refreshTokens(userId, refreshToken);

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

    return res.json(tokens);
  }
}
