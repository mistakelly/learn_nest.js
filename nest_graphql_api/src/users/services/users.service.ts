import { Injectable } from '@nestjs/common';
import { CreateUserInput } from '../models/users.model';
import { UserEntity } from 'src/entities/users.entity';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordHashingService } from './password_hashing.service';

/**
 * Service for user-related operations.
 * It contains methods for creating a user and retrieving all users.
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly passwordHasher: PasswordHashingService,
  ) {}

  /**
   * Creates a new user in the database.
   * @param args - The user data input, including username, email, password, etc.
   * @returns The created user entity with assigned id, createdAt, and updatedAt.
   */
  async createUser(args: CreateUserInput): Promise<UserEntity> {
    const newUser = this.userRepository.create(args);

    // hash users password before saving to database

    const hashedUserPassword = await this.passwordHasher.hashPassword(newUser.password)

    newUser.password = hashedUserPassword

    console.log('hasheduserpassword', hashedUserPassword)

    console.log('new user password', newUser.password)

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
