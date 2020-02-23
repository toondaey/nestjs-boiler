import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../user/user.entity';
import { AuthService } from '../auth.service';
import { plainToClass } from 'class-transformer';
import TokenResponse from '../interfaces/token-response.interface';
import { Controller, Post, Req, UseGuards, HttpCode, HttpStatus, All } from '@nestjs/common';

@Controller()
export class LoginController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    @HttpCode(HttpStatus.OK)
    async login(@Req() req: Request): Promise<any> {
        return this.authService.login(plainToClass(User, req.user));
    }


    @UseGuards(AuthGuard('bearer-refresh'))
    @All('auth/token/refresh')
    @HttpCode(HttpStatus.OK)
    async refreshToken(@Req() req: Request): Promise<TokenResponse> {
        return this.authService.login(plainToClass(User, req.user));
    }
}
