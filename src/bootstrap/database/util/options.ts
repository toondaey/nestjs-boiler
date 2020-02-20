import {
    TypeOrmModuleOptions,
    TypeOrmModuleAsyncOptions,
    TypeOrmOptionsFactory,
} from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface'

export type DatabaseOptions = TypeOrmModuleAsyncOptions & TypeOrmModuleOptions;
