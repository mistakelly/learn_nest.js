import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// CUSTOM IMPORTS
import { UserType } from 'src/shared/gql-types/user.type';
import { UserEntity } from 'src/entities/users.entity';

/**
 * Service for user-related operations.
 * It contains methods for creating a user and retrieving all users.
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    // private readonly passwordHasher: PasswordHashingService,
  ) {}

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findOneBy({ email });

    return user;
  }

  async findUserById(id: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findOneBy({ id });

    return user;
  }

  /**
   * Retrieves all users from the database.
   * @returns A list of all user entities in the database.
   */

  async getAllUser(): Promise<UserType[]> {
    const users = await this.userRepository.find();
    return users;
  }
}
