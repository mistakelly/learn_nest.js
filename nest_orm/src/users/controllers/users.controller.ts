import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  BadRequestException,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ValidateUserRequestDto } from '../dtos/create_user.dto';
import { ControllerResponse } from 'src/types/user_response.interface';

@Controller('users') 
export class UsersController {
  
  // Inject the UsersService to handle business logic
  constructor(private userService: UsersService) {}

  /**
   * Utility method to parse a string ID into a number.
   * Throws a BadRequestException if the input is not a valid number.
   * This ensures robust handling of invalid route parameters.
   *
   * @param id - The ID as a string (e.g., from route parameters)
   * @returns The parsed ID as a number
   */
  parseId(id: string): number {
    const parsedId = parseInt(id, 10);

    // Handle invalid IDs (e.g., passing a non-numeric string)
    if (isNaN(parsedId)) {
      throw new BadRequestException('id must be a valid integer');
    }

    return parsedId;
  }

  /**
   * GET /users
   * Retrieves all users from the database.
   *
   * @returns A response object containing a success message and a list of users
   */
  @Get()
  async getUsersCon(): ControllerResponse {
    const users = await this.userService.getUsersService();
    return { message: 'User successfully retrieved', users };
  }

  /**
   * GET /users/:id
   * Retrieves a single user by ID.
   *
   * @param id - The ID of the user (provided as a route parameter)
   * @returns A response object containing a success message and the user data
   */
  @Get(':id')
  async getSingleUserCon(@Param('id') id: string): ControllerResponse {
    const user = await this.userService.getSingleUserService(this.parseId(id));
    return { message: 'User successfully retrieved', user };
  }

  /**
   * POST /users
   * Creates a new user in the database.
   *
   * @param body - The request body containing user details (validated via DTO)
   * @returns A response object containing a success message and the created user
   */
  @Post()
  async createUserCon(@Body() body: ValidateUserRequestDto): ControllerResponse {
    const user = await this.userService.createUserService(body);

    return { message: 'User successfully created', user };
  }

  /**
   * PUT /users/:id
   * Updates an existing user's details by ID.
   *
   * @param id - The ID of the user to update (provided as a route parameter)
   * @param body - The request body containing updated user details (validated via DTO)
   * @returns A response object containing a success message and the updated user
   */
  @Put(':id')
  async updateUserCon(
    @Param('id') id: string,
    @Body() body: ValidateUserRequestDto,
  ): ControllerResponse {
    const user = await this.userService.updateUserService(
      this.parseId(id),
      body,
    );

    return { message: 'User successfully updated', user };
  }

  /**
   * DELETE /users/:id
   * Deletes a user by ID from the database.
   *
   * @param id - The ID of the user to delete (provided as a route parameter)
   * @returns A response object containing a success message
   */
  @Delete(':id')
  async deleteUserCon(@Param('id') id: string): ControllerResponse {
    this.userService.deleteUserService(+id);

    return { message: 'User successfully deleted' };
  }
}
