import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GqlOptionsFactory, GqlModuleOptions } from "@nestjs/graphql";

@Injectable()
export class GraphQLConfigService implements GqlOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createGqlOptions(): GqlModuleOptions {
        return this.configService.get('graphql');
    }
}
