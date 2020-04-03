import { Entity, Column } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from "../../utils/entities/base.entity";

/**
 * User entity
 * @extends {BaseEntity}
 */
@Entity({ name: 'users' })
export class User extends BaseEntity {
    /**
     * User entity constructor.
     * @param {Partial<User>} partial Partial user.
     */
    constructor(partial: Partial<User>) {
        super();
        Object.assign(this, partial);
    }

    /** Roles of user. */
    @Column('simple-array', { select: false, default: 'user', nullable: true })
    roles: string[];

    /** First name of user */
    @Column({ type: 'varchar', length: 100, insert: true })
    firstName: string;

    /** Last name of user */
    @Column({ type: 'varchar', length: 100, nullable: true })
    lastName?: string;

    /** Username of user */
    @Column({ type: 'varchar', unique: true, insert: true })
    username: string;

    /** Email of user */
    @Column({ type: 'varchar', length: 255, unique: true, insert: true })
    email: string;

    /** Password */
    @Exclude()
    @Column({ type: 'varchar', select: false, insert: true })
    password: string;
}
