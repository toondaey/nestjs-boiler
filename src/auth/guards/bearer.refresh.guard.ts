import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Strategies } from "../strategies/strategies.enum";

@Injectable()
export class BearerRefreshGuard extends AuthGuard(Strategies.BEARER_REFRESH) {}
