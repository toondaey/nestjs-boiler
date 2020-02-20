import { User as  UserInterface } from '../interfaces/user.interface';
import { IsString, IsNotEmpty, IsEmail, MaxLength, MinLength, } from 'class-validator';

export class CreateUserDto implements UserInterface {
    @IsString()
    @IsNotEmpty()
    readonly first_name: string;

    @IsString()
    @IsNotEmpty()
    readonly last_name: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    @MaxLength(50)
    @MinLength(8)
    readonly password: string
}
