import { IsString, IsEmail, IsOptional } from 'class-validator'; // Validators to ensure correct data format

export class ValidateUserRequestDto {
  // Ensures that 'username' is a string and is required for the request
  @IsString()
  username: string;

  // Ensures that 'email' is a valid email format.
  // It's optional, so it can be omitted in the request body
  @IsEmail()
  @IsOptional()
  email: string;
}
