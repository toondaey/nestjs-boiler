import { User } from "./user.entity";
import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserSubscriber } from "./subscribers/user.subscriber";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService, UserSubscriber],
    exports: [UserService],
})
export class UserModelModule {}
