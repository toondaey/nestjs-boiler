import { registerAs } from "@nestjs/config";
import { GqlModuleOptions } from "@nestjs/graphql";
import { EmailAddressResolver, JSONObjectResolver } from "graphql-scalars";

export default registerAs('graphql', () =>
    ({
        typePaths: process.env.GRAPHQL_TYPE_PATHS ?
            process.env.GRAPHQL_TYPE_PATHS.split(',') :
            ['./**/*.graphql'],
        playground: ~[true, 'true'].indexOf(process.env.GRAPHQL_PLAYGROUND) || !process.env.GRAPHQL_PLAYGROUND ?
            true :
            false,
        debug: ~[true, 'true'].indexOf(process.env.GRAPHQL_DEBUG) || !process.env.GRAPHQL_DEBUG ?
            true :
            false,
        resolvers: {
            JSONObject: JSONObjectResolver,
            EmailAddress: EmailAddressResolver,
        },
        context: ({ req }) => ({ request: req })
    } as GqlModuleOptions)
);
