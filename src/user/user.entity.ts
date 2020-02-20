import { hash, genSalt } from 'bcrypt';
import { Exclude, Type } from 'class-transformer';
import { User as UserInterface } from './interfaces/user.interface';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert } from "typeorm";

@Entity({ name: 'users' })
export class User implements UserInterface {
    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100 })
    first_name: string;

    @Column({ type: 'varchar', length: 100 })
    last_name: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Exclude()
    @Column()
    password: string

    @Exclude()
    @CreateDateColumn({ nullable: true })
    created_at?: Date;

    @Exclude()
    @UpdateDateColumn({ nullable: true })
    updated_at?: Date;

    @BeforeInsert()
    async hashPassword() {
        const salt = await genSalt(10);
        const hashed = await hash(this.password, salt);

        this.password = hashed;
    }
}

export class UserResponse {
    message: string;
    @Type(() => User)
    data: User;
}

export class UsersResponse {
    message: string;
    @Type(() => User)
    data: Array<User>
}
