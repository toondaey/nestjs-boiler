import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtConfigService } from './jwt-config.service';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModelModule } from '../user/model/user.module';
import { AuthController } from './controllers/auth.controller';
import { AuthResolver } from './graphql/resolvers/auth.resolver';
import { BearerRefreshStrategy } from './strategies/bearer-refresh.strategy';
import { BearerAuthenticationStrategy } from './strategies/bearer-authenticate.strategy';

@Module({
    imports: [
        PassportModule,
        UserModelModule,
        JwtModule.registerAsync({ useClass: JwtConfigService }),
    ],
    providers: [
        AuthService,
        AuthResolver,
        LocalStrategy,
        BearerRefreshStrategy,
        BearerAuthenticationStrategy,
    ],
    exports: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
