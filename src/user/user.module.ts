import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserModelModule } from './model/user.module';

@Module({
    imports: [UserModelModule],
    providers: [UserResolver]
})
export class UserModule {}
