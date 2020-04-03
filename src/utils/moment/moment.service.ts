import moment from "moment-timezone";
import { Injectable, Scope } from '@nestjs/common';

/**
 * MomentService
 * @class
 * @property {moment.Moment} _now
 */
@Injectable({ scope: Scope.REQUEST })
export class MomentService {
    /** Current time */
    readonly _now: moment.Moment;

    /**
     * MomentService constructor
     */
    constructor() {
        this._now = moment.tz();
    }

    /**
     * @returns {moment.Moment|null}
     */
    get now() {
        return this._now;
    }

    /**
     * @returns {function}
     */
    get moment() {
        return moment
    }
}
