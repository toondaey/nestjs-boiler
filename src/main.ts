import { setup } from './bootstrap';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './bootstrap/app/app.module';

async function bootstrap() {
    const app = await setup(async () => await NestFactory.create(AppModule, { cors: true }));

    const configService = app.get<ConfigService>(ConfigService);

    await app.listen(configService.get('app.port'));
}

bootstrap();
