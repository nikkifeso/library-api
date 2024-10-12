import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserDto{
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    createdOn?: Date
}