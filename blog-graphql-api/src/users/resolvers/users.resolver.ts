import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateUserInput, UserModel } from '../models/users.model';
import { UsersService } from '../services/users.service';
import { UserEntity } from 'src/entities/users.entity';

/**
 * Resolver for user-related GraphQL queries and mutations.
 * It connects the GraphQL schema with the service layer for user operations.
 * Each method resolver method calls a dedicated service method for handling business logic
 */
@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UsersService) {}

  /**
   * GraphQL mutation to create a new user.
   * Accepts `createUserInput` and returns the created user entity.
   *
   * @param createUserInput - Input object containing user data for creation.
   * @returns Created user entity.
   */
  @Mutation(() => UserModel)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserEntity> {
    return this.userService.createUser(createUserInput);
  }

  /**
   * GraphQL query to retrieve all users from the database.
   *
   * @returns List of all users.
   */
  @Query(() => [UserModel])
  async getAllUser(): Promise<UserEntity[]> {
    return await this.userService.getAllUser();
  }
}
