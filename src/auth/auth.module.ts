import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/user/users.module';
import { LoginController } from './login/login.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { RegisterController } from './register/register.controller';
import { JwtStrategy } from './strategies/bearer-authenticate.strategy';
import { TokenRefreshStrategy } from './strategies/bearer-refresh.strategy';

@Module({
    imports: [
        UsersModule,
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('app.jwt.key'),
                signOptions: {
                    expiresIn: configService.get('app.jwt.expiresIn'),
                    issuer: configService.get('app.url'),
                }
            }),
            inject: [ConfigService],
        })
    ],
    controllers: [LoginController, RegisterController],
    providers: [AuthService, LocalStrategy, JwtStrategy, TokenRefreshStrategy]
})
export class AuthModule {}
