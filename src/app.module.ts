import { Connection } from 'typeorm';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from './user/users.module';
import { BootstrapModule } from './bootstrap/bootstrap.module';
import { AuthModule } from './auth/auth.module';
import { ProfileController } from './profile/profile.controller';

@Module({
    imports: [
        UsersModule,
        BootstrapModule.forRoot({ autoLoadEntities: true }),
        AuthModule,
    ],
    controllers: [ProfileController],
})
export class AppModule {
    constructor(
        private readonly configService: ConfigService,
        private readonly connection: Connection
    ) {
        //
    }
}
