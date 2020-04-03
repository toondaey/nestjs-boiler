import { Exclude } from "class-transformer";
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity as Original } from "typeorm";

export class BaseEntity extends Original {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Exclude()
    @CreateDateColumn({ nullable: true })
    created_at?: Date;

    @Exclude()
    @UpdateDateColumn({ nullable: true })
    updated_at?: Date;
}
