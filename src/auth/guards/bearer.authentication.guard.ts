import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Strategies } from "../strategies/strategies.enum";

/**
 * LoginOtpGuard
 * @class
 */
@Injectable()
export class BearerAuthenticationGuard extends AuthGuard(Strategies.BEARER_AUTHENTICATION) { }
