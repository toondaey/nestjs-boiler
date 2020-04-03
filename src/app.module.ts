import app from './config/app';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UtilsModule } from './utils/utils.module';
import { GraphQLModule } from './graphql/graphql.module';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [
        DatabaseModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [app],
            envFilePath: process.env.NODE_ENV_FILE_PATH || '.env',
            expandVariables: true
        }),
        UtilsModule,
        UserModule,
        GraphQLModule,
        AuthModule,
    ]
})
export class AppModule {}
