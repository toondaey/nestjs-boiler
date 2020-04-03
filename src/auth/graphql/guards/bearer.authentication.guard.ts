import { Injectable } from '@nestjs/common';
import { BearerGuard } from './abstracts/bearer.guard.abstract';
import { BearerAuthenticationGuard as BaseBearerAuthenticationGuard } from "../../guards/bearer.authentication.guard";

@Injectable()
export class BearerAuthenticationGuard extends BearerGuard(BaseBearerAuthenticationGuard) {}
