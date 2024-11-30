import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
// import { UserType } from 'src/shared/gql-types/user.type';
import { UsersService } from '../services/users.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Public } from 'src/modules/auth/decorators/public.decorator';
import { UserEntity } from '../entities/users.entity';
import { UpdateUsernameInput } from '../dtos/updateusername.dto';
import { UpdateEmailInput } from '../dtos/updateemail.dto';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UsersService) {}

  /**
   * Query to retrieve a user by their ID.
   * @param id User's unique identifier.
   * @returns User data if found.
   */
  @Query(() => UserEntity)
  async findUserById(@Args('id') id: string): Promise<UserEntity> {
    const user = await this.userService.findUserById(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  /**
   * Query to retrieve a user by their email.
   * @param email User's email address.
   * @returns User data if found.
   */
  @Query(() => UserEntity)
  async findUserByEmail(@Args('email') email: string): Promise<UserEntity> {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  /**
   * Mutation to update a user's email.
   * @param updateEmailInput Email update input data.
   * @returns Updated user entity.
   */
  @Mutation(() => UserEntity)
  async updateUserEmail(
    @Args('updateEmailInput') updateEmailInput: UpdateEmailInput,
  ): Promise<UserEntity | null> {
    return this.userService.updateUserEmail(updateEmailInput);
  }

  /**
   * Mutation to update a user's username.
   * @param updateUsernameInput Username update input data.
   * @returns Updated user entity.
   */
  @Mutation(() => UserEntity)
  async updateUsername(
    @Args('updateUsernameInput') updateUsernameInput: UpdateUsernameInput,
  ): Promise<UserEntity | null> {
    return this.userService.updateUsername(updateUsernameInput);
  }

  /**
   * Mutation to delete a user by their ID.
   * @param id User's unique identifier.
   * @returns True if the user was deleted successfully.
   */
  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    const userExists = await this.userService.findUserById(id);
    if (!userExists) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }
    return this.userService.deleteUser(id);
  }

  /**
   * Public query to send a greeting message.
   * @returns Greeting message.
   */
  @Public()
  @Query(() => String)
  async greetings() {
    return "Greetings Sir! Hope you're enjoying your weekend and your baby boy isn’t keeping you up all night this time 😅🚀";
  }

  /**
   * Public query to retrieve all users.
   * @returns List of all users.
   */
  @Public()
  @Query(() => [UserEntity])
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }
}
