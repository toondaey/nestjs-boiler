import app from './configurations/app';
import { Module } from '@nestjs/common';
import database from './configurations/database';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({ load: [database, app], isGlobal: true }),
    ],
    exports: [ConfigModule]
})
export class ConfigurationModule {
    constructor(private readonly configService: ConfigService) {
        //
    }
}
