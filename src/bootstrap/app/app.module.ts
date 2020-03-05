import { Module } from '@nestjs/common';
import { AuthModule } from '../../auth/auth.module';
import { UsersModule } from '../../user/users.module';
import { BootstrapModule } from '../bootstrap.module';
import { ProfileController } from '../../profile/profile.controller';

@Module({
    imports: [
        UsersModule,
        BootstrapModule.forRoot({ autoLoadEntities: true }),
        AuthModule,
    ],
    controllers: [ProfileController],
})
export class AppModule {
    constructor() {}
}
