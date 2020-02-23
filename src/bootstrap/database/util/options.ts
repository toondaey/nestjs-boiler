import {
    TypeOrmModuleOptions,
    TypeOrmModuleAsyncOptions,
} from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface'

export type DatabaseOptions = TypeOrmModuleAsyncOptions & TypeOrmModuleOptions;
