import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

// Import the User entity to interact with the database
import { User } from '../entity/User.entity';

@Module({
  // TypeOrmModule.forFeature registers the User entity with the TypeORM feature
  // allowing the service to interact with the User repository
  imports: [TypeOrmModule.forFeature([User])],

  // Providers are services that can be injected into other components.
  // UsersService is the service responsible for business logic.
  providers: [UsersService],

  // Controllers are responsible for handling incoming requests and returning responses.
  // UsersController contains the route handlers for user-related requests.
  controllers: [UsersController],
})
export class UsersModule {}
