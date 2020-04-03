import { map } from "rxjs/operators";
import { Reflector } from "@nestjs/core";
import { STATUS } from "../../../metadata/status.metadata";
import { NestInterceptor, ExecutionContext, CallHandler, Injectable, HttpStatus } from "@nestjs/common";

export interface Response<T> {
    status: number
    response: T
};

/**
 * Data wrapper Interceptor.
 * @property {Reflector} reflector
 */
@Injectable()
export class DataWrapperInterceptor implements NestInterceptor {
    /**
     * Data wrapper constructor
     * @constructor
     * @param {Reflector} reflector
     */
    constructor(private reflector: Reflector) { }

    /**
     * Interceptor
     * @param {ExecutionContext} context Execution context
     * @param {CallHandler} next Call handler
     */
    intercept(context: ExecutionContext, next: CallHandler) {
        return next.handle().pipe(
            map(response => {
                const status = this.reflector.get<string>(STATUS, context.getHandler()) || HttpStatus.OK;

                return { status, response };
            })
        );
    }
}
