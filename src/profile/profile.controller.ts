import { Request } from 'express';
import { User } from 'src/user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { Controller, Req, UseGuards, Get, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';

@Controller('profile')
export class ProfileController {
    @UseGuards(AuthGuard('bearer-authentication'))
    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    profile(@Req() req: Request): User {
        return plainToClass(User, req.user);
    }
}
