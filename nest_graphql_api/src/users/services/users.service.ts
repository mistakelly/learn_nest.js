import { Injectable } from '@nestjs/common';
import { CreateUserInput } from '../models/users.model';
import { UserEntity } from 'src/entities/users.entity';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

/**
 * Service for user-related operations.
 * It contains methods for creating a user and retrieving all users.
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  /**
   * Creates a new user in the database.
   * @param args - The user data input, including username, email, password, etc.
   * @returns The created user entity with assigned id, createdAt, and updatedAt.
   */
  async createUser(args: CreateUserInput): Promise<UserEntity> {
    const newUser = this.userRepository.create(args);
    return this.userRepository.save(newUser);
  }

  /**
   * Retrieves all users from the database.
   * @returns A list of all user entities in the database.
   */
  async getAllUser() {
    return await this.userRepository.find();
  }
}
