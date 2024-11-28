import { Field,  ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class LoginResponseType {
  @Field()
  access_token: string;

  @Field()
  message: string;
}