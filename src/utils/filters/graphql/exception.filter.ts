import { GqlExceptionFilter } from "@nestjs/graphql";
import { Catch, HttpException } from "@nestjs/common";

@Catch(HttpException)
export class GraphQLExceptionFilter implements GqlExceptionFilter {
    catch(exception: HttpException) {
        const { error, message } = exception.getResponse() as any;

        return { status: exception.getStatus(), error: error || message };
    }
}
