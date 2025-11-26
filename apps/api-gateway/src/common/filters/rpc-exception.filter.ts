import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch()
export class RpcExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';

        if (exception instanceof RpcException) {
            const error = exception.getError();
            if (typeof error === 'object' && error !== null) {
                const errObj = error as any;
                if (errObj.statusCode) {
                    status = errObj.statusCode;
                }
                if (errObj.message) {
                    message = Array.isArray(errObj.message)
                        ? errObj.message[0]
                        : errObj.message;
                }
            } else if (typeof error === 'string') {
                message = error;
            }
        } else if (exception.status) {
            status = exception.status;
            if (exception.message) {
                message = exception.message;
            }
            if (exception.response && exception.response.message) {
                message = Array.isArray(exception.response.message)
                    ? exception.response.message[0]
                    : exception.response.message;
            }
        }

        response.status(status).json({
            statusCode: status,
            message,
            timestamp: new Date().toISOString(),
            path: ctx.getRequest().url,
        });
    }
}
