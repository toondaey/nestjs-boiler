import { Request } from 'express';
import { AuthService } from '../auth.service';
import { User } from '../../user/model/user.entity';
import { TokenResponse } from '../types/token-response.type';
import { BearerRefreshGuard } from '../guards/bearer.refresh.guard';
import { Controller, All, UseGuards, HttpCode, HttpStatus, Req } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(
        /* AuthService */
        private readonly authService: AuthService
    ) { }

    /**
     * User login handler
     * @param {express.Request} req express.Request
     * @returns {Promise<TokenResponse>}
     */
    @UseGuards(BearerRefreshGuard)
    @All('token/refresh')
    @HttpCode(HttpStatus.OK)
    refreshToken(@Req() req: Request): Promise<TokenResponse> {
        return this.authService.login(req.user as User);
    }
}
