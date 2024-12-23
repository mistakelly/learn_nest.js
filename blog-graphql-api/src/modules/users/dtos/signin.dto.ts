
import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';



@InputType()
export class LogInInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  email: string;

  @IsNotEmpty()
  @Field()
  password: string;
}
