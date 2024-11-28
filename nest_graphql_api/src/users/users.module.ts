import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UserResolver } from './resolvers/users.resolver';

@Module({
  providers: [UsersService, UserResolver],
})
export class UsersModule {}
