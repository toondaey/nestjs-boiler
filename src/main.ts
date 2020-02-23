import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { ValidationPipe } from '@nestjs/common';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    const config = app.get('ConfigService');
    // Validation configuration
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        })
    );
    // Well-known threats protection
    app.use(helmet());
    // Gzip compression configuration
    app.use(compression());

    app.use(
        rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // limit each IP to 100 requests per windowMs
        }),
    );

    await app.listen(config.get('app.port'));
}
bootstrap();
