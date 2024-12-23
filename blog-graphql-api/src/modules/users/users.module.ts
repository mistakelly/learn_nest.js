import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UserResolver } from './resolvers/users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/users/entities/users.entity';
import { PasswordHashingService } from './services/password_hashing.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [UserResolver, UsersService, PasswordHashingService],
  exports: [UsersService, PasswordHashingService, TypeOrmModule],
})
export class UsersModule {}
