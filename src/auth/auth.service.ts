import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/model/user.entity';
import { UserService } from "../user/model/user.service";
import { HashService } from '../utils/hash/hash.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenResponse, TokenResponseMeta } from './types/token-response.type';

@Injectable()
/** @class */
export class AuthService {
    /**
     * Authentication service.
     * @param {JwtService} jwtService @nestjs/jwt service
     * @param {UserService} userService UserService
     * @param {ConfigService} configService ConfigService
     */
    constructor(
        private readonly hashService: HashService,
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly configService: ConfigService
    ) {
        //
    }

    /**
     * Validates user's password.
     * @param {String} email
     * @param {String} password
     * @returns {Promise<User>} Promise<User>
     */
    async validateUser(username: string, password?: string): Promise<User> {
        const user = await this.userService.findByEmail(username);

        if (!user && (!password && !this.hashService.compare(user.password, password))) {
            throw new UnauthorizedException();
        }

        return user;
    }

    /**
     * Login authhentication.
     * @param {User} user User entity
     * @return {TokenResponse}
     */
    async login(user: User): Promise<TokenResponse> {
        return { token: await this.jwtService.sign({ sub: user.id, }), ...this.tokenMeta() };
    }

    /**
     * Formats token response.
     * @param {String} token Token
     * @returns {TokenResponse}
     */
    tokenMeta(): TokenResponseMeta {
        return {
            _meta: {
                type: 'bearer',
                expiresIn: this.configService.get('app.jwt.expiresIn'),
                validFor: this.configService.get('app.jwt.maxAge'),
            },
        };
    }
}
