import { Module } from "@nestjs/common";
import { CustomValidationPipe } from "./validation.pipe";
import { UniqueValidator } from "./custom/unique.validator";

@Module({
    imports: [CustomValidationPipe],
    providers: [UniqueValidator],
    exports: [UniqueValidator],
})
export class ValidationModule {}
