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

                        const config = {
                            type: defaultConnection,
                            host: configService.get(`database.connections.${defaultConnection}.host`),
                            port: configService.get(`database.connections.${defaultConnection}.port`),
                            username: configService.get(`database.connections.${defaultConnection}.user`),
                            password: configService.get(`database.connections.${defaultConnection}.password`),
                            synchronize: configService.get(`database.connections.${defaultConnection}.synchronize`),
                            database: configService.get(`database.connections.${defaultConnection}.database`),
                            insecureAuth: configService.get(`database.connections.${defaultConnection}.insecureAuth`),
                            migrationsRun: true,
                            ...options,
                        };

                        // Clean up configuration.
                        for (const key in config) {
                            if (config[key] === undefined) {
                                delete config[key];
                            }
                        }

                        return config;
                    }
                }),
            ]
        }
    }
}
