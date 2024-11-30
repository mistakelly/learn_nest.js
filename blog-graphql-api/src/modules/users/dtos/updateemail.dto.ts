import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateEmailInput {
  @IsNotEmpty()
  @IsUUID()
  @Field()
  id: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  email: string;
}
