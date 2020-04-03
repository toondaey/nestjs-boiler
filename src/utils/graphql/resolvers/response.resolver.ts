import { Resolver, ResolveField } from "@nestjs/graphql";

/**
 * Response Resolver
 * @class
 */
@Resolver('Response')
export class ResponseResolver {
    /**
     * __resolveType
     * @param value anu
     * @param _ any
     * @param info any
     * @return {string}
     */
    @ResolveField()
    __resolveType(value: any, _: any, info: any): string {
        if (value.error) {
            if (Array.isArray(value.error)) {
                return 'Status422ErrorResponse';
            }

            if (typeof value.error === 'string') {
                return 'ErrorResponse';
            }
        }

        if (value.message) {
            return 'SuccessResponse';
        };

        switch (info.path.key) {
            case 'login': return 'Login';
            case 'tokenRefresh': return 'Login';
            case 'registerUser': return 'User';
        }
    }
}
