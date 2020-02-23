import { User } from './user.entity';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from '../utils/utils.module';
import { UserSubscriber } from './subscribers/user.subscriber';

@Module({
    imports: [TypeOrmModule.forFeature([User]), UtilsModule],
    providers: [UserService, UserSubscriber],
    exports: [TypeOrmModule, UserService]
})
export class UsersModule {
    //
}
