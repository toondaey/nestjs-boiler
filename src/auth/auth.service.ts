import * as bcrypt  from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import TokenResponse from './interfaces/token-response.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
        //
    }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userService.findByEmail(email);

        return await bcrypt.compare(password, user.password) && user;
    }

    async login(user: User): Promise<TokenResponse> {
        return this.tokenMeta(await this.jwtService.sign({ sub: user.id, }))
    }

    tokenMeta(token: string): TokenResponse {
        return {
            type: 'bearer',
            token,
            expiresIn: this.configService.get('app.jwt.expiresIn'),
            validFor: this.configService.get('app.jwt.maxAge'),
        };
    }
}
