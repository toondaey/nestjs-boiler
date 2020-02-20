import { plainToClass } from 'class-transformer';
import { UserService } from 'src/user/user.service';
import { UserResponse } from 'src/user/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Controller, UseInterceptors, ClassSerializerInterceptor, Post, Body, HttpException } from '@nestjs/common';

@Controller('auth')
export class RegisterController {
    constructor(private readonly userService: UserService) {
        //
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('register')
    async create(@Body() body: CreateUserDto): Promise<UserResponse> {
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
