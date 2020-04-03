import gql from "./config/gql";
import { Module } from "@nestjs/common";
import { GraphQLConfigService } from "./graphql-config.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule as OriginalModule } from "@nestjs/graphql";

@Module({
    imports: [
        ConfigModule.forFeature(gql),
        OriginalModule.forRootAsync({ useClass: GraphQLConfigService })
    ],
    exports: [OriginalModule]
})
export class  GraphQLModule {};
