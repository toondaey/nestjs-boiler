import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtOptionsFactory, JwtModuleOptions } from "@nestjs/jwt";

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createJwtOptions(): JwtModuleOptions {
        return {
            secret: this.configService.get('app.jwt.key'),
            signOptions: {
                expiresIn: this.configService.get('app.jwt.expiresIn'),
                issuer: this.configService.get('app.url'),
            }
        };
    }
}
