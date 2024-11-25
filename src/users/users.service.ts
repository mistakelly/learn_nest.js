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

  // Updates an existing user
  // Finds the user by ID and updates their data with the request body
  // @param id - the ID of the user to update
  // @param body - the new data to update the user with
  // @returns - the updated user object
  updateUser(id: number, @Body() body: RecordStringAny): UserInterface {
    // Find the index of the user to update
    const userIndex = UserDB.findIndex((user) => user.id == id);

    // If user is not found, throw a NotFoundException
    if (userIndex == -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    // Spread the existing user data and the new body data to update the user
    const user = { ...UserDB[userIndex], ...body };

    // Update the user in the UserDB
    UserDB[userIndex] = user;

    return user;
  }

  // Deletes a user by ID from the UserDB
  // If the user is not found, throws a NotFoundException
  // @param id - the ID of the user to delete
  deleteUser(id: number): void {
    // Find the index of the user to delete
    const userIndex = UserDB.findIndex((user) => user.id == id);

    // If user is not found, throw a NotFoundException
    if (userIndex == -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    // Remove the user from the UserDB
    UserDB.splice(userIndex, 1);
  }
}
