import { SetMetadata } from "@nestjs/common";

/** @type {string} STATUS constant */
export const STATUS = 'status';

/**
 * Set status code
 * @param {number} status Status code
 */
export const SetStatus = (status: number) => SetMetadata(STATUS, status);
