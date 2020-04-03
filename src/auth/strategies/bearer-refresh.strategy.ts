import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Strategies } from './strategies.enum';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/model/user.service';
import { BearerStrategy } from './abstract/bearer.abstract';

@Injectable()
export class BearerRefreshStrategy extends BearerStrategy(PassportStrategy(Strategy, Strategies.BEARER_REFRESH)) {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: configService.get('app.jwt.key'),
        });
    }
}
