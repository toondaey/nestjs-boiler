import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Strategies } from "../strategies/strategies.enum";

@Injectable()
export class LocalGuard extends AuthGuard(Strategies.LOCAL) {}
