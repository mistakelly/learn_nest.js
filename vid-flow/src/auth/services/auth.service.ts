import { ConflictException, Injectable } from '@nestjs/common';
import { AuthDto } from '../dto/auth.dto';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { PasswordHashingService } from './password_hashing.service';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthEmailService } from 'src/common/services/email.service';
// import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly passwordHashingService: PasswordHashingService,
    private readonly userService: UsersService,
    private readonly emailService: AuthEmailService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerRequest: AuthDto.RegisterRequest) {
    const userExists = await this.userService.findUserByEmailorUsername(
      registerRequest.email,
      registerRequest.username,
    );

    if (userExists) {
      throw new ConflictException('Email or username already exists');
    }

    const createUser = this.userRepository.create(registerRequest);

    createUser.password = await this.passwordHashingService.hashPassword(
      createUser.password,
    );

    const saveUser = await this.userRepository.save(createUser);
    const { password, ...user } = saveUser;
    const accessToken = await this.generateAccessToken(user.id, user.email);

    try {
      await this.emailService.sendEmail({
        id: saveUser.id,
        recipient: saveUser.email,
      });
    } catch (err) {
      console.log('error', err);
      throw err;
    }

    return { accessToken, ...user };
  }

  async generateAccessToken(id: number, email: string): Promise<string> {
    const payload = { id, email };
    return this.jwtService.sign(payload);
  }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
