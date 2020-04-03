import { Injectable } from '@nestjs/common';
import { BearerGuard } from './abstracts/bearer.guard.abstract';
import { BearerRefreshGuard as BaseBearerRefreshGuard } from "../../guards/bearer.refresh.guard";

@Injectable()
export class BearerRefreshGuard extends BearerGuard(BaseBearerRefreshGuard) {}
