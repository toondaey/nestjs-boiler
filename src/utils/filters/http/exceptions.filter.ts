import { Response } from 'express';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

/**
 * HttpExceptionFilter
 * @class
 * @implements ExceptionFilter
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    /**
     * Error formating.
     * @param {HttpException} exception HttpException
     * @param {ArgumentsHost} host ArgumentsHost
     * @returns {express.Response}
     */
    catch(exception: HttpException, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const status = exception.getStatus();

        const { error, message } = exception.getResponse() as any;

        return response
            .status(status)
            .json({ status, error: error || message });
    }
};
