import * as helmet from 'helmet';
import * as compression from 'compression';
import { ConfigService } from '@nestjs/config';
import * as rateLimit from 'express-rate-limit';
import { INestApplication,  } from '@nestjs/common';
import { CustomValidationPipe } from '../utils/validation/validation.pipe';

export async function setup(cb: () => Promise<INestApplication>) {
    // Create a basic http application
    const app: INestApplication = await cb();

    // Config service to setup other global dependencies...
    const configService: ConfigService = app.get<ConfigService>(ConfigService);

    // Global validation pipe
    app.useGlobalPipes(
        new CustomValidationPipe({
            disableErrorMessages: configService.get('app.env') === 'production',
            whitelist: true,
        })
    );

    // Well-known threats protection
    app.use(helmet());

    // Gzip compression configuration
    app.use(compression());

    // Rate limiter
    app.use(
        rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // limit each IP to 100 requests per windowMs
        }),
    );

    return app;
}
