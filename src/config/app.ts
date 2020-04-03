import ms from "ms";
import { registerAs } from '@nestjs/config';
import { ValidationPipeOptions, HttpStatus } from '@nestjs/common';
import { exceptionFactory } from "./utils/validation/exceptionFactory";
import { getRateLimiterStore } from "./utils/rateLimiter/getRateLimiterStore";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

export default registerAs('app', () => ({
    apiPrefix: process.env.API_PREFIX || 'api/v1',
    name: process.env.APP_NAME,
    timezone: process.env.TIMEZONE || 'UTC',
    env: process.env.APP_ENV || process.env.NODE_ENV || 'production',
    port: process.env.APP_PORT,
    url: process.env.APP_URL,
    jwt: {
        key: process.env.JWT_KEY,
        expiresIn: process.env.JWT_EXPIRES_IN,
        maxAge: process.env.JWT_MAX_AGE,
    },
    /** Validation configuration @see https://docs.nestjs.com/techniques/validation */
    validation: {
        disableErrorMessages: false,
        whitelist: true,
        transform: true,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        exceptionFactory,
    } as ValidationPipeOptions,
    rateLimiter: {
        windowMs: ms(process.env.APP_RATE_LIMITER_MS || '15m'), // 15 minutes
        max: process.env.APP_RATE_LIMITER_MAX || 100,
        store: getRateLimiterStore(process.env.APP_RATE_LIMITER_STORE)
    },
    cors: {
        origin: process.env.CORS_ORIGIN ?
            (process.env.CORS_ORIGIN === '*' ? process.env.CORS_ORIGIN : process.env.CORS_ORIGIN.split(',')) :
            '*',
        credentials: true,
        preflight: true,
        methods: process.env.CORS_METHODS || 'GET,POST,PUT,PATCH,DELETE'
    } as CorsOptions,
}));
