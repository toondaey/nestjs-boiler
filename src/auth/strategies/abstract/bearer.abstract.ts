import { Type } from '@nestjs/common';
import { User } from '../../../user/model/user.entity';
import { UserService } from '../../../user/model/user.service';

/**
 * MixinBearerStrategy
 * @param {JwtStrategy} Strategy JwtStrategy
 * @returns {BearerStrategy}
 */
export function BearerStrategy<T extends Type<any> = any>(Strategy: T): {new (...args: any[]): InstanceType<T>} {
    /** MixinBearerStrategy */
    abstract class MixinBearerStrategy extends Strategy {
        /**
         * @readonly
         * @type {UserService} useSerice UserService
         * @abstract
         */
        abstract readonly userService: UserService;

        /**
         * Constructor
         * @constructor
         */
        constructor(...args: any[]) {
            super(...args);
        }

        /**
         * Jwt validate.
         * @param {object} payload Jwt Payload
         * @returns {Promise<DocumentType<UserSchema>>}
         */
        async validate(payload: { sub: string }): Promise<User> {
            return await this.userService.findById(payload.sub);
        }
    }

    return MixinBearerStrategy;
};
