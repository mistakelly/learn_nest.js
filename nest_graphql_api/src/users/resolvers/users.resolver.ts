import { Resolver, Query } from '@nestjs/graphql';
import { UserModel } from '../models/users.model';
import { UsersService } from '../services/users.service';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => [UserModel])
  getAllUser() {
    return [
      { id: '1', username: 'kelly', email: 'kellyokoye@gmail.com' },
      { id: '2', username: 'ayo', email: 'ayomide@gmail.com' },
    ];
  }
}
