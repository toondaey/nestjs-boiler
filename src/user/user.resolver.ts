import { UserService } from "./model/user.service";
import { UseFilters, HttpStatus } from "@nestjs/common";
import { Resolver, Args, Mutation } from "@nestjs/graphql";
import { CreateUserDto } from "./model/dto/create-user.dto";
import { SetStatus } from "../utils/metadata/status.metadata";
import { GraphQLExceptionFilter } from "../utils/filters/graphql/exception.filter";

/**
 * User Resolver
 */
@Resolver()
export class UserResolver {
    /**
     * User resolver constructor
     * @param {UserResolver} userService User Service
     */
    constructor(private readonly userService: UserService) {}

    /**
     * Register a new user.
     * @param newUserData Create User Dto
     * @returns {User}
     */
    @Mutation()
    @UseFilters(GraphQLExceptionFilter)
    @SetStatus(HttpStatus.CREATED)
    registerUser(@Args('input') newUserData: CreateUserDto) {
        return this.userService.create(newUserData);
    }
}
