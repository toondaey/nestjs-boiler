import { DatabaseOptions } from './database/util'
import { Module, DynamicModule } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigurationModule } from './config/config.module';
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces/config-module-options.interface'

@Module({})
export class BootstrapModule {
    static forRoot<T extends DatabaseOptions & ConfigModuleOptions>(options: T): DynamicModule {
        return {
            module: BootstrapModule,
            imports: [DatabaseModule.forRoot(options), ConfigurationModule]
        };
    }
}
