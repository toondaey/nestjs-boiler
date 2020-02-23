import { Injectable } from '@nestjs/common';
import { User } from '../../user/user.entity';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';

@Injectable()
export class TokenRefreshStrategy extends PassportStrategy(Strategy, 'bearer-refresh') {
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

    async validate(payload: { id: string }): Promise<User> {
        return await this.userService.findById(payload.id);
    }
}
