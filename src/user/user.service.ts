import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { User as UserInterface } from './interfaces/user.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
        //
    }

    create(body: UserInterface): User {
        return this.userRepository.create(body);
    }

    findById(id: string): Promise<User | null> {
        return this.userRepository.findOne(id);
    }

    findByEmail(email: string, options: FindOneOptions<User> = {}): Promise<User | null> {
        return this.userRepository.findOne({ email }, options);
    }

    find(): Promise<User[]> {
        return this.userRepository.find();
    }

    save(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    remove(user: User): Promise<User> {
        return this.userRepository.remove(user);
    }
}
