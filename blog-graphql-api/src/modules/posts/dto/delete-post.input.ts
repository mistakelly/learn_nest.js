import { InputType,  Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class DeletePostInput {
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  @Field()
  PostId: string;

  @IsUUID()
  @IsNotEmpty()
  @IsString()
  @Field()
  userId: string;
}
