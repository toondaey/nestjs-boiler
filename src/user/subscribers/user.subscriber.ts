import { User } from '../user.entity'
import { Injectable } from '@nestjs/common';
import { HashService } from '../../utils/hash/hash.service';
import { EntitySubscriberInterface, Connection, InsertEvent } from 'typeorm';

@Injectable()
export class UserSubscriber implements EntitySubscriberInterface<User> {
    constructor(connection: Connection, private readonly hashService: HashService) {
        connection.subscribers.push(this);
    }

    listenTo() {
        return User;
    }

    async beforeInsert(event: InsertEvent<User>) {
        const salt = await this.hashService.genSalt(10);
        const hashed = await this.hashService.hash(event.entity.password, salt);

        event.entity.password = hashed;
    }
}
