import app from '../../config/app';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import database from '../../config/database';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [database, app],
            envFilePath: process.env.NODE_ENV_FILE_PATH || '.env'
        }),
    ],
    exports: [ConfigModule]
})
export class ConfigurationModule {}
