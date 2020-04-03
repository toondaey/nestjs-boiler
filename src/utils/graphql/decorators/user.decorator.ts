import { GqlExecutionContext } from '@nestjs/graphql';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
    (_: unknown, context: ExecutionContext) => {
        const ctx = new GqlExecutionContext(context.getArgs());

        return ctx.getContext().request.user;
    }
);
