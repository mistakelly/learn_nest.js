import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { InputType, Field, } from '@nestjs/graphql';

@InputType()
export class UpdateUsernameInput {
  @IsNotEmpty()
  @IsUUID()
  @Field()
  id: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  username: string;
}
