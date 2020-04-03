import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Strategies } from './strategies.enum';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '../../user/model/user.entity';
import { HashService } from '../../utils/hash/hash.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, Strategies.LOCAL) {
    constructor (
        private readonly authService: AuthService,
        private readonly hashService: HashService,
    ) {
        super({
            usernameField: 'username',
            passwordField: 'password'
        });
    }

    async validate(username: string, password: string): Promise<User> {
        return await this.authService.validateUser(username, password);
    }
}
