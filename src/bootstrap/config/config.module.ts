import app from './configurations/app';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import database from './configurations/database';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [database, app],
            envFilePath: '.env' //`.env.${process.env.NODE_ENV || 'development'}` Considerations for testing purposes
        }),
    ],
    exports: [ConfigModule]
})
export class ConfigurationModule {}
