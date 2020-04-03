import { Module } from '@nestjs/common';
import database from './config/database';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfigService } from './typeorm.service';

@Module({
    imports: [
        ConfigModule.forFeature(database),
        TypeOrmModule.forRootAsync({ useClass: TypeORMConfigService }),
    ]
})
export class DatabaseModule {}

