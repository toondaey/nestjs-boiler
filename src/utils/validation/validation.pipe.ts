import {
    ValidationPipe,
    ArgumentMetadata,
    BadRequestException,
    UnprocessableEntityException,
    Injectable
} from '@nestjs/common';
import { ObjectType } from '../types';
import { ConfigService } from '@nestjs/config';

/**
 * CustomValidationPipe
 * @class
 * @extends {ValidationPipe}
 */
@Injectable()
export class CustomValidationPipe extends ValidationPipe {
    constructor(private readonly configService: ConfigService) {
        super({
            disableErrorMessages: configService.get('app.env') === 'production',
            whitelist: true,
        });
    }

    /**
     * Custom Transformer.
     * @param {ObjectType} value Value
     * @param {ArgumentMetadata} metadata ArgumentMetadata
     * @returns {any}
     */
    async transform(value: ObjectType, metadata: ArgumentMetadata): Promise<any> {
        try {
            return await super.transform(value, metadata);
        } catch (e) {
            if (e instanceof BadRequestException) {
                const { error, message } = e.getResponse() as any;

                throw new UnprocessableEntityException('Unprocessable Entity', message || error);
            }
        }
    }
}
