import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { DeleteResult, Repository } from 'typeorm';
import { PostEntity } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/services/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    private readonly userService: UsersService,
  ) {}

  async createPost(
    createPostInput: CreatePostInput,
    
    userId: string,
  ): Promise<PostEntity> {
    const user = await this.userService.findUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    const post = this.postRepository.create({
      ...createPostInput,
      user,
    });

    return this.postRepository.save(post);
  }

  findAll(): Promise<PostEntity[]> {
    return this.postRepository.find({ relations: ['user'] }); 
  }

  async findOne(id: string): Promise<PostEntity> {
    const foundPost = await this.postRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!foundPost) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return foundPost;
  }

  async update(
    updatePostInput: UpdatePostInput,
    userId: string,
  ): Promise<PostEntity> {
    const { id, ...updateData } = updatePostInput;

    const existingPost = await this.findOne(id);

    const userExists = await this.userService.findUserById(userId)

    if (!userExists){
      throw new BadRequestException("User Not found, Kindly signup before creating a post")
    }
    
    // Check if the user owns the post
    if (existingPost.user.id !== userId) {
      throw new ForbiddenException('You are not allowed to update this post');
    }

    await this.postRepository.update(id, updateData);

    return this.findOne(id);
  }

  async remove(id: string, userId: string): Promise<DeleteResult> {
    const post = await this.findOne(id);

    // Check if the user owns the post
    if (post.user.id !== userId) {
      throw new ForbiddenException('You are not allowed to delete this post');
    }

    return this.postRepository.delete(id);
  }
}
