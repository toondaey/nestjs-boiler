import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { User, UserResponse } from '../user/user.entity';
import { Controller, Req, UseGuards, Get, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';

@Controller('profile')
export class ProfileController {
    @UseGuards(AuthGuard('bearer-authentication'))
    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    profile(@Req() req: Request): UserResponse {
        return { data: plainToClass(User, req.user) };
    }
}
