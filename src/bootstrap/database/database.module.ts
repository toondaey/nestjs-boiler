import { DatabaseOptions } from './util';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, DynamicModule } from '@nestjs/common';

@Module({})
export class DatabaseModule {
    static forRoot<T extends DatabaseOptions>(options: T): DynamicModule {
        return {
            module: DatabaseModule,
            imports: [
                TypeOrmModule.forRootAsync({
                    inject: [ConfigService],
                    useFactory: async (configService: ConfigService) => {
                        const defaultConnection = configService.get('database.default');

                        return {
                            type: defaultConnection,
                            host: configService.get(`database.connections.${defaultConnection}.host`, 'localhost'),
                            port: configService.get(`database.connections.${defaultConnection}.port`, 3306),
                            username: configService.get(`database.connections.${defaultConnection}.user`),
                            password: configService.get(`database.connections.${defaultConnection}.password`),
                            synchronize: configService.get(`database.connections.${defaultConnection}.synchronize`, true),
                            database: configService.get(`database.connections.${defaultConnection}.database`, 'alice'),
                            insecureAuth: configService.get(`database.connections.${defaultConnection}.insecureAuth`, false),
                            ...options,
                        };
                    }
                }),
            ]
        }
    }
}
