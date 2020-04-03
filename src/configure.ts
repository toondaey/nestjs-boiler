import helmet from "helmet";
import compression from "compression";
import { AppModule } from "./app.module";
import rateLimit from "express-rate-limit";
import { ConfigService } from "@nestjs/config";
import { useContainer } from "class-validator";
import { INestApplication } from "@nestjs/common";
import { MomentService } from "./utils/moment/moment.service";
import { CustomValidationPipe } from "./utils/validation/validation.pipe";

/**
 * Configure application
 * @param {INestApplication} app INestApplication
 */
export async function configure<T extends INestApplication>(app: T) {
    // Validation conatainer
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    // Config service to setup other global dependencies...
    const configService: ConfigService = app.get<ConfigService>(ConfigService);

    // Setup app timezone...
    const momentService: MomentService = await app.resolve(MomentService);

    momentService.moment.tz.setDefault(configService.get('app.timezone'));

    // Custom Validation Filter
    const validationPipe = app.get<CustomValidationPipe>(CustomValidationPipe);

    // Global validation pipe
    app.useGlobalPipes(validationPipe);

    /** Global prefix. */
    app.setGlobalPrefix('api/v1');

    // Well-known threats protection
    app.use(helmet());

    // Gzip compression configuration
    app.use(compression());

    // Rate limiter
    app.use(rateLimit(configService.get('app.rateLimiter')));
};
