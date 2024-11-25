import { IsString, IsOptional, IsEmail, isNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  @IsOptional() // email is optional
  email?: string;

  password: string;
}
