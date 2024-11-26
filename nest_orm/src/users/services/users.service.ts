// FIXME: FIX DUPLICATE ENTRY FOR UNIQUE VALUES IN PUT REQUEST.eg <EMAIL>
import {
  Injectable,
  Body,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/User.entity';
import { Repository } from 'typeorm';
import { ValidateUserRequestDto } from '../dtos/create_user.dto';
import { ControllerResponse } from 'src/types/user_response.interface';

@Injectable() // Marks this class as a service that can be injected into other components
export class UsersService {
  constructor(
    // Inject the User repository to interact with the database
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  /**
   * Utility method to fetch a user by ID.
   * Throws a NotFoundException if the user does not exist.
   *
   * @param id - The ID of the user to fetch
   * @returns The user entity
   */
  async getUserUtil(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id <${id}> not found`);
    }

    return user;
  }

  /**
   * Fetch all users from the database.
   *
   * @returns An array of user entities
   */
  async getUsersService(): Promise<User[]> {
    return await this.userRepository.find();
  }

  /**
   * Fetch a single user by ID using the utility method.
   *
   * @param id - The ID of the user to fetch
   * @returns The user entity
   */
  async getSingleUserService(id: number): Promise<User> {
    return await this.getUserUtil(id);
  }

  /**
   * Create a new user in the database.
   *
   * @param body - The validated request body containing user details
   * @returns The created user entity
   */
  async createUserService(@Body() body: ValidateUserRequestDto): Promise<User> {
    const newUser = this.userRepository.create({ ...body });

    return await this.userRepository.save(newUser);
  }

  /**
   * Update an existing user's details by ID.
   * Handles conflicts for unique fields such as email.
   *
   * @param id - The ID of the user to update
   * @param body - The validated request body containing updated details
   * @returns The updated user entity
   *
   * @throws ConflictException - If the email is already in use by another user
   */
  async updateUserService(id: number, body: ValidateUserRequestDto) {

    // Fetch the existing user or throw a NotFoundException
    const user = await this.getUserUtil(id);

    if (body.email) {
      // Check for email uniqueness by finding another user with the same email
      const existingUser = await this.userRepository.findOne({
        where: { email: body.email },
      });

      // If an existing user is found and it's not the same as the current user, throw a conflict error
      if (existingUser && existingUser.id !== user.id) {
        throw new ConflictException('Email already in use by another user');
      }
    }

    // Merge the updates into the existing user entity
    Object.assign(user, body);

    // Save the updated user entity back to the database
    return this.userRepository.save(user);
  }

  /**
   * Delete a user by ID.
   *
   * @param id - The ID of the user to delete
   * @returns void
   */
  async deleteUserService(id: number): Promise<void> {
    // Fetch the user to ensure it exists
    const user = await this.getUserUtil(id);

    // Delete the user by their ID
    await this.userRepository.delete(user.id);
  }
}
