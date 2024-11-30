import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { UserEntity } from '../entities/users.entity';

@ObjectType()
export class LoginResponseType {
  @Field()
  access_token: string;

  @Field()
  user: UserEntity;

  @Field()
  message: string;
}
