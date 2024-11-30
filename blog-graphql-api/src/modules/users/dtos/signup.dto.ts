
import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';



@InputType()
export class SignUpInput {
  @IsString()
  @Field()
  @IsNotEmpty()
  username: string;

  @IsString()
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;
}
