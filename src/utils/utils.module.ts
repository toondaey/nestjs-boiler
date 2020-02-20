import { Module } from '@nestjs/common';
import { HashModule } from './hash/hash.module';

@Module({
    imports: [HashModule],
    exports: [HashModule]
})
export class UtilsModule {}
