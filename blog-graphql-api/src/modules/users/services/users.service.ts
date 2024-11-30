import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// CUSTOM IMPORTS
import { UserEntity } from 'src/modules/users/entities/users.entity';
import { UpdateUsernameInput } from '../dtos/updateusername.dto';
import { UpdateEmailInput } from '../dtos/updateemail.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}



  /**
   * Retrieves all users from the database.
   * @returns A list of all user entities.
   */
  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }


  
  /**
   * Retrieves a user by ID
   * @param id The ID of the user to retrieve
   * @returns The UserEntity or null
   */
  async findUserById(id: string): Promise<UserEntity | null> {
    return await this.userRepository.findOneBy({ id });
  }



  /**
   * Retrieves a user by email
   * @param email The email of the user to retrieve
   * @returns The UserEntity or null
   */
  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({ where: { email } });
  }



  /**
   * Updates a user's username
   * @param updateUsernameInput Object containing the ID and new username
   * @returns The updated UserEntity or null
   */
  async updateUsername(
    updateUsernameInput: UpdateUsernameInput,
  ): Promise<UserEntity | null> {
    const { username, id } = updateUsernameInput;

    // Check if user exists by their ID
    const user = await this.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Safely update the username
    user.username = username;
    return await this.userRepository.save(user);
  }



  /**
   * Updates a user's email
   * @param id The ID of the user to update
   * @param email The new email address
   * @returns The updated UserEntity or null
   */
  async updateUserEmail(
    updateEmailInput: UpdateEmailInput,
  ): Promise<UserEntity | null> {
    const { id, email } = updateEmailInput;

    // Check if user exists by their ID
    const user = await this.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update the user's email
    user.email = email;
    return await this.userRepository.save(user);
  }

  

  /**
   * Deletes a user by ID
   * @param id The ID of the user to delete
   * @returns True if the user was successfully deleted
   */
  async deleteUser(id: string): Promise<boolean> {
    const user = await this.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.delete(id);
    return true;
  }
}
