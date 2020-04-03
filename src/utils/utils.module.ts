import { Module, Global } from '@nestjs/common';
import { HashService } from './hash/hash.service';
import { MomentService } from './moment/moment.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ValidationModule } from './validation/validation.module';
import { HttpExceptionFilter } from './filters/http/exceptions.filter';
import { ResponseResolver } from './graphql/resolvers/response.resolver';
import { DataWrapperInterceptor } from './graphql/interceptors/response/data-wrapper.interceptor';

@Global()
@Module({
    imports: [ValidationModule],
    providers: [
        MomentService,
        HashService,
        { provide: APP_FILTER, useClass: HttpExceptionFilter },
        { provide: APP_INTERCEPTOR, useClass: DataWrapperInterceptor },
        ResponseResolver,
    ],
    exports: [MomentService, HashService, ValidationModule],
})
export class UtilsModule {}
