import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { SignUpInput, LogInInput } from 'src/shared/dtos/user.dto';

// import { UserModel } from 'src/users/models/users.model';
import { UserEntity } from 'src/modules/users/entities/users.entity';
import { PasswordHashingService } from '../users/services/password_hashing.service';
import { UsersService } from 'src/modules/users/services/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly hashingservice: PasswordHashingService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Register a new user
  async registerUser(args: SignUpInput): Promise<UserEntity> {
    const existingUser = await this.userService.findUserByEmail(args.email);
    if (existingUser) {
      throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
    }

    const newUser = this.userRepository.create(args);
    newUser.password = await this.hashingservice.hashPassword(args.password);

    return await this.userRepository.save(newUser);
  }

  // Login a user and generate JWT token
  async loginUser(args: LogInInput): Promise<Record<string, any>> {
    const { email, password } = args;
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new ForbiddenException(
        'User not found on our server, try register before login',
      );
    }

    const isPasswordValid = await this.hashingservice.comparePasswords(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new ForbiddenException('Invalid email or password');
    }

    // Generate JWT token
    const payload = { userId: user.id, email: user.email };
    const access_token = this.jwtService.sign(payload);

    // console.log('access_token', access_token);

    return { access_token, user: user };
  }

  // Verify JWT token
  async verifyToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
