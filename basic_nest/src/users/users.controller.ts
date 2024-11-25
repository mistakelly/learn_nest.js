import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  BadRequestException,
} from '@nestjs/common';

import { UserInterface, RecordStringAny } from './shared';

import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  //  inject UsersService into the controller
  constructor(private readonly userservice: UsersService) {}
  // GET /users - Retrieves a list of users
  @Get()
  getAllUsers(): RecordStringAny {
    // Returns a placeholder response with users data
    // call service this.getAllUsers()
    return { users: this.userservice.getAllUsers() };
  }

  // get single user
  @Get(':id')
  getSingleUser(@Param('id') id: string): UserInterface {
    // convert id to integer
    const parsedID = parseInt(id, 10);

    if (isNaN(parsedID)) {
      throw new BadRequestException('id must be a valid integer');
    }

    // call service this.getSingleUser(id)
    return this.userservice.getSingleUser(parsedID);
  }

  // POST /users - Creates a new user
  @Post()
  createUser(@Body() body: CreateUserDto): RecordStringAny {
    // Accepts the user data in the body and returns a success message with the created user
    // call service this.createUser(body)
    this.userservice.createUser(body);
    return { message: 'User created successfully', user: body };
  }

  // PUT /users/:id - Updates an existing user by id
  @Put(':id')
  updateUser(
    @Param('id') id: string, // Retrieves the user id from the URL parameter
    @Body() body: UserInterface, // Accepts the user data to update
  ): RecordStringAny {
    // Returns a success message along with the updated user data

    const parsedID = parseInt(id, 10);

    if (isNaN(parsedID)) {
      throw new BadRequestException('id must be a valid integer');
    }
    // call service this.updateUser(id, body)
    const user = this.userservice.updateUser(parsedID, body);
    return { message: 'User updated successfully', user: user };
  }

  // DELETE /users/:id - Deletes a user by id
  @Delete(':id')
  deleteUser(@Param('id') id: number): RecordStringAny {
    // call service this.deleteUser(id)
    this.userservice.deleteUser(id);
    // Returns a success message confirming the deletion of the user
    return { message: 'User deleted successfully' };
  }
}
