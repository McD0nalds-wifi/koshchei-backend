import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class UserDto {
    @IsEmail()
    @IsOptional()
    email?: string

    @IsString()
    @IsOptional()
    name?: string

    @MinLength(6, { message: 'password must be at least 6 characters' })
    @IsString()
    @IsOptional()
    password?: string
}
