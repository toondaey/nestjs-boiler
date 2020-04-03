import { ConfigService } from "@nestjs/config";
import { Injectable, Scope } from "@nestjs/common";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";

/**
 * TypeORMConfigService
 * @class
 */
@Injectable({ scope: Scope.TRANSIENT })
export class TypeORMConfigService implements TypeOrmOptionsFactory {
    /**
     * TypeORM configuration Service.
     * @constructor
     * @param {ConfigService} configService Configuration service
     */
    constructor(
        /** @readonly */
        private readonly configService: ConfigService
    ) { }

    /**
     * Creates mongoose configuration/connection object.
     * @returns {MongooseModuleOptions}
     */
    createTypeOrmOptions(): TypeOrmModuleOptions {
        // We get the default configuration that the database configuration will be based on.
        const config = { type: this.configService.get('database.default') };

        // Return config...
        return Object.assign(config, this.configService.get(`database.connections.${config.type}`));
    }
}
