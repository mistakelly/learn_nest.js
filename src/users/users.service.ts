import { Injectable, NotFoundException, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserInterface, RecordStringAny, UserDB } from './shared';

@Injectable()
export class UsersService {
  // Retrieves all users from the UserDB
  // Returns an array of UserInterface objects
  getAllUsers(): UserInterface[] {
    return UserDB;
  }

  // Retrieves a single user by ID
  // If the user is not found, throws a NotFoundException
  // @param id - the ID of the user to retrieve
  // @returns - a single user object if found
  getSingleUser(id: number): UserInterface {
    console.log('single user', id);
    // Find the user by ID
    const singleUser = UserDB.find((user) => user.id == id);

    // If user is not found, throw a NotFoundException
    if (!singleUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return singleUser;
  }

}
