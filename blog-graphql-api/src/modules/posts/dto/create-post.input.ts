import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreatePostInput {
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  @Field()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  title: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  content: string;
}
