import { GqlExecutionContext } from '@nestjs/graphql';
import { Type, ExecutionContext } from '@nestjs/common';

/**
 * Abstract Bearer Guard Generator
 * @param {{ new() }} Guard Guard
 * @return {{ new() }}
 */
export function BearerGuard<T extends Type<any> = any>(Guard: T): { new(...args: any[]): InstanceType<T> } {
    /** MixinBearerGuard */
    abstract class MixinBearerGuard extends Guard {
        /**
         * Constructor
         * @constructor
         */
        constructor(...args: any[]) {
            super(...args);
        }

        /**
         * Get Request
         * @param {ExecutionContext} context Execution Context
         */
        getRequest(context: ExecutionContext) {
            const ctx = GqlExecutionContext.create(context);

            const { request } = ctx.getContext();

            return request;
        }
    }

    return MixinBearerGuard;
};
