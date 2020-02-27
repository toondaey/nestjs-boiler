import { plainToClass } from 'class-transformer';
import { UserService } from '../../user/user.service';
import { UserResponse } from '../../user/user.entity';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { Controller, UseInterceptors, ClassSerializerInterceptor, Post, Body, HttpException } from '@nestjs/common';

@Controller('auth')
export class RegisterController {
    constructor(private readonly userService: UserService) {
        //
    }

    @Post('register')
    @UseInterceptors(ClassSerializerInterceptor)
    async create(@Body() body: CreateUserDto): Promise<UserResponse> {
        console.log(body);
        const user = this.userService.create(body);

        if (await this.userService.findByEmail(body.email)) {
            throw new HttpException({ message: 'User already exists.' }, 400);
        }

        return plainToClass(UserResponse, {
            message: 'User created',
            data: await this.userService.save(user)
        });
    }
}
