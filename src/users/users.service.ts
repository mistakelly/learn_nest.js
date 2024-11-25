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
  // Creates a new user and adds them to the UserDB
  // The user is assigned an incremented ID
  // @param body - the user data to create (from the CreateUserDto)
  // @returns - the newly created user object
  createUser(@Body() body: CreateUserDto): UserInterface {
    // Generate a new user with an incremented ID
    const user: UserInterface = {
      id: UserDB[UserDB.length - 1]?.id + 1 || 1, // Increment ID based on the last user's ID
      ...body, // Spread the body data (username, email, password)
    };

    // Add the new user to the UserDB
    UserDB.push(user);

    console.log('user length', UserDB.length); // Log the updated user list
    console.log('new user', user); // Log the newly created user

    return user; // Return the created user
  }

 
}
