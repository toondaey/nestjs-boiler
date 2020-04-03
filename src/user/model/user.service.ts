import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from "../../utils/entities/base.service";

/**
 * User service.
 */
@Injectable()
export class UserService extends BaseService<User> {
    /**
     * User service constructor
     * @param {Repository<User>} userRepository User repository
     */
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
        super(userRepository);
    }

    /**
     * Find user by email or username.
     * @param {string} email Email
     * @param {FindOptions<User>} options FindOptions
     */
    findByEmail(item: string): Promise<User | null> {
        return this.findOne({
            where: [
                { email: item },
                { username: item }
            ]
        });
    }
}
