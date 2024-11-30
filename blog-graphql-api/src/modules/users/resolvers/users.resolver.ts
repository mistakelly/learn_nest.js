import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

// CUSTOM IMPORTS
import { UserType } from 'src/shared/gql-types/user.type';
import { UsersService } from '../services/users.service';
import { BadRequestException } from '@nestjs/common';
/**
 * Resolver for user-related GraphQL queries and mutations.
 * It connects the GraphQL schema with the service layer for user operations.
 * Each method resolver method calls a dedicated service method for handling business logic
 */
@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userService: UsersService) {}

  /**
   * GraphQL query to retrieve all users from the database.
   *
   * @returns List of all users.
   */

  // TODO: IMPLEMENT VALIDATION FOR VALID INPUT TYPES EG<EMPTY EMAIL INPUT>

  @Query(() => UserType)
  async findUserById(@Args('id') id: string) {
    const user = await this.userService.findUserById(id);

    if (!user) {
      throw new BadRequestException('user Not found');
    }

    return user;
  }

  @Query(() => UserType)
  async findUserByEmail(@Args('id') id: string) {
    const user = await this.userService.findUserByEmail(id);

    if (!user) {
      throw new BadRequestException('user Not found');
    }

    return user;
  }

  @Query(() => [UserType])
  async findUsers(): Promise<UserType[]> {
    return this.userService.getAllUser();
  }

  
}
