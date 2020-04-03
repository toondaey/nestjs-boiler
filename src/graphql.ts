
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum GenderEnum {
    MALE = "MALE",
    FEMALE = "FEMALE"
}

export class Credentials {
    username: string;
    password: string;
}

export class UserRegistrationData {
    username?: string;
    email?: EmailAddress;
    password?: string;
    firstName?: string;
}

export interface Response {
    status: number;
}

export class ErrorResponse implements Response {
    status: number;
    error: Error;
}

export class Login implements Response {
    status: number;
    response: Token;
}

export class MessageError {
    message?: string;
}

export abstract class IMutation {
    abstract registerUser(data?: UserRegistrationData): Response | Promise<Response>;
}

export abstract class IQuery {
    abstract login(credentials: Credentials): Response | Promise<Response>;
}

export class Status422Error {
    fields?: string[];
}

export class SuccessResponse implements Response {
    status: number;
    message: string;
}

export class Token {
    token: string;
    _meta: TokenMeta;
}

export class TokenMeta {
    type: string;
    validFor: string;
    expiresIn: string;
}

export type EmailAddress = any;
export type Error = MessageError | Status422Error;
