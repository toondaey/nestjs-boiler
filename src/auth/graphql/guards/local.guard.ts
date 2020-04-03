import { GqlExecutionContext } from '@nestjs/graphql';
import { Injectable, ExecutionContext } from '@nestjs/common';
import { LocalGuard as BaseLocalGuard } from "../../guards/local.guard";

@Injectable()
export class LocalGuard extends BaseLocalGuard {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);

        const { request } = ctx.getContext();

        request.body = ctx.getArgs().credentials;

        return request;
    }
}
