import { configure } from "./configure";
import { AppModule } from "./app.module"
import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";

/**
 * Bootstrap.
 */
async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });

    // Config service to setup other global dependencies...
    const configService: ConfigService = app.get<ConfigService>(ConfigService);

    await configure(app);

    // Start app...
    await app.listen(configService.get('app.port'));
}

bootstrap();
