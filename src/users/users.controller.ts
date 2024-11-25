import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

// define type for Record<string, any>
type RecordStringAny = Record<string, any>;

@Controller('users')
export class UsersController {
  // GET /users - Retrieves a list of users
  @Get()
  getAllUsers(): RecordStringAny {
    // Returns a placeholder response with users data
    return { users: 'all user' };
  }

  // POST /users - Creates a new user
  @Post()
  createUser(@Body() body: RecordStringAny): RecordStringAny {
    // Accepts the user data in the body and returns a success message with the created user
    return {
      message: 'User created successfully',
      user: body,
    };
  }

  // PUT /users/:id - Updates an existing user by id
  @Put(':id')
  updateUser(
    @Param('id') id: number, // Retrieves the user id from the URL parameter
    @Body() body: RecordStringAny, // Accepts the user data to update
  ): RecordStringAny {
    // Returns a success message along with the updated user data
    return {
      message: 'User updated successfully',
      user: body,
    };
  }

  // DELETE /users/:id - Deletes a user by id
  @Delete(':id')
  deleteUser(@Param('id') id: number): RecordStringAny {
    // Returns a success message confirming the deletion of the user
    return { message: 'User deleted successfully' };
  }
}
