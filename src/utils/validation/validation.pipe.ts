import {
    ValidationPipe, ArgumentMetadata, BadRequestException, UnprocessableEntityException, Injectable, HttpStatus
} from '@nestjs/common';

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        try {
            return await super.transform(value, metadata);
        } catch (e) {
            if (e instanceof BadRequestException) {
                throw new UnprocessableEntityException(e.message.message);
            }
        }
    }
}
