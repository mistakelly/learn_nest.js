import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field(() => [String], { nullable: true })
  hobbies?: string[];

  password: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateUserInput {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field(() => [String], { nullable: true })
  hobbies?: string[];

  @Field()
  password: string;
}
