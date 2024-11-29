import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

// CUSTOM IMPORTS
import { UserType } from 'src/shared/gql-types/user.type';
import { UsersService } from '../services/users.service';
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

  @Query(() => [UserType])
  async getAllUser(): Promise<UserType[]> {
    return this.userService.getAllUser();
  }
}
