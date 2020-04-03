import { AuthService } from "../../auth.service";
import { Resolver, Query } from "@nestjs/graphql";
import { LocalGuard } from "../guards/local.guard";
import { User } from "../../../user/model/user.entity";
import { STATUS } from "../../../utils/metadata/status.metadata";
import { User as CurrentUser } from "../../../utils/graphql/decorators/user.decorator";
import { GraphQLExceptionFilter } from "../../../utils/filters/graphql/exception.filter";
import { UseGuards, UseFilters, UseInterceptors, SetMetadata, HttpStatus } from "@nestjs/common";
import { DataWrapperInterceptor } from "../../../utils/graphql/interceptors/response/data-wrapper.interceptor";

/**
 * (Graphql) Auth resolver
 * @property {AuthService} authService
 */
@Resolver()
export class AuthResolver {
    /**
     * Auth resolver constructor
     * @param {AuthService} authService Auth Service
     */
    constructor(
        private readonly authService: AuthService
    ) {}

    /**
     * Login query handler
     * @param {User} user User entity
     * @returns {Promise<TokenResponse>}
     */
    @Query('login')
    @UseGuards(LocalGuard)
    @UseFilters(GraphQLExceptionFilter)
    @SetMetadata(STATUS, HttpStatus.OK)
    login(@CurrentUser() user: User) {
        return this.authService.login(user);
    }
}
