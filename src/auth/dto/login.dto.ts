import { IsString, IsNotEmpty, MinLength, MaxLength } from "class-validator";

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(50)
    @IsNotEmpty()
    password: string;
}
