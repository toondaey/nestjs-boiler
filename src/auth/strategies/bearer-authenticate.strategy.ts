import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { BearerStrategy } from './abstract/bearer.abstract';
import { UserService } from '../../user/model/user.service';

@Injectable()
export class BearerAuthenticationStrategy extends BearerStrategy(PassportStrategy(Strategy, 'bearer-authentication')) {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('app.jwt.key'),
            jsonWebTokenOptions: {
                maxAge: configService.get('app.jwt.maxAge')
            }
        });
    }
}
