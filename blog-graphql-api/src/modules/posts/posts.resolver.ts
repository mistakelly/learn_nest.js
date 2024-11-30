import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { PostEntity } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { NotFoundException } from '@nestjs/common';
import { DeleteResponse } from './entities/delete_response';

@Resolver(() => PostEntity)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => PostEntity)
  async createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
  ): Promise<PostEntity> {
    const newPost = await this.postsService.createPost(
      createPostInput,
      createPostInput.userId,
    );

    return newPost;
  }

  @Query(() => [PostEntity], { name: 'findAllPosts' })
  findAll() {
    return this.postsService.findAll();
  }

  @Query(() => PostEntity, { name: 'findPostById' })
  async findOne(@Args('id') id: string): Promise<PostEntity> {
    return await this.postsService.findOne(id);
  }

  @Mutation(() => PostEntity)
  async updatePost(
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
    @Args('userId') userId: string, 
  ): Promise<PostEntity> {
    console.log('inside update');

    return await this.postsService.update(updatePostInput, userId);
  }

  @Mutation(() => DeleteResponse)
  async removePost(
    @Args('id') id: string,
    @Args('userId') userId: string,
  ): Promise<DeleteResponse> {
    const deleteResult = await this.postsService.remove(id, userId);

    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return {
      success: true,
      message: `Post with ID ${id} deleted successfully`,
    };
  }
}
