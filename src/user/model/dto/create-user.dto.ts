import { IsString, IsNotEmpty, IsEmail, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    readonly firstName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    readonly username: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    @MaxLength(50)
    @MinLength(8)
    readonly password: string;
}
