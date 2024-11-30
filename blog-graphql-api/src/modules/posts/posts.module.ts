import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { UserEntity } from 'src/modules/users/entities/users.entity';
import { UsersService } from '../users/services/users.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([PostEntity])],
  providers: [PostsResolver, PostsService, UsersService],
  exports: [PostsResolver, PostsService],
})
export class PostsModule {}
