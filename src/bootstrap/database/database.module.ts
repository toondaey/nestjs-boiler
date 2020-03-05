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
                        // We get the default configuration that the database configuration will be based on.
                        const defaultConnection = configService.get('database.default');

                        // We create a new configuration.
                        const config = {
                            migrationsRun: true,
                            type: defaultConnection,
                            host: configService.get(`database.connections.${defaultConnection}.host`),
                            port: configService.get(`database.connections.${defaultConnection}.port`),
                            username: configService.get(`database.connections.${defaultConnection}.user`),
                            password: configService.get(`database.connections.${defaultConnection}.password`),
                            database: configService.get(`database.connections.${defaultConnection}.database`),
                            synchronize: configService.get(`database.connections.${defaultConnection}.synchronize`),
                            insecureAuth: configService.get(`database.connections.${defaultConnection}.insecureAuth`),
                            ...options,
                        };

                        // Clean up configuration.
                        for (const key in config) {
                            if (config[key] === undefined) {
                                delete config[key];
                            }
                        }

                        // Return configuration.
                        return config;
                    }
                }),
            ]
        }
    }
}
