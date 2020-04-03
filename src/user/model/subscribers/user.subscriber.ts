import { User } from '../user.entity';
import { Injectable } from '@nestjs/common';
import { HashService } from '../../../utils/hash/hash.service';
import { EntitySubscriberInterface, Connection, InsertEvent } from 'typeorm';

/**
 * User subscriber
 */
@Injectable()
export class UserSubscriber implements EntitySubscriberInterface<User> {
    /**
     * User subscriber constructor.
     * @param {Connection} connection mongoose.connection
     * @param {HashService} hashService Hash Service
     */
    constructor(connection: Connection, private readonly hashService: HashService) {
        connection.subscribers.push(this);
    }

    /**
     * Entity to listen to.
     * @returns {User}
     */
    listenTo() {
        return User;
    }

    /**
     * Data modification before insertion.
     * @param event InsertEvent
     */
    async beforeInsert(event: InsertEvent<User>) {
        const salt = await this.hashService.genSalt(10);

        const hashed = await this.hashService.hash(event.entity.password, salt);

        event.entity.password = hashed;
    }
}
