import { Module } from '@nestjs/common';
import { HashModule } from './hash/hash.module';
import { CustomValidationPipe } from './validation/validation.pipe';

@Module({
    imports: [HashModule],
    exports: [HashModule],
})
export class UtilsModule {}
