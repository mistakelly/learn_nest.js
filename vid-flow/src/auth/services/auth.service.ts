import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { AuthDto } from '../dto/auth.dto';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { PasswordHashingService } from './password_hashing.service';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthEmailService } from 'src/common/services/email.service';
import { InjectQueue } from '@nestjs/bull';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { Constants } from 'src/constants';
import Bull, { Queue } from 'bull';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectQueue(Constants.MAIL_QUEUE)
    private readonly mailQueue: Queue,
    private readonly passwordHashingService: PasswordHashingService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly emailService: AuthEmailService,
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
      this.logger.log('mailQueue Added');
      await this.sendVerificationEmail(saveUser.id, saveUser.email);

      // await this.emailService.sendEmail({ id, email: as recipeent });

      // TESTING SAKE WITH NO QUEUE WHEN THE USER POOR INTERNET CONNECTION OR ERROR WITH THE MAIL SERVER
      // await this.emailService.sendEmail({id: saveUser.id, recipient: saveUser.email });
    } catch (err) {
      this.logger.error(err);
    }

    return { accessToken, ...user };
  }

  async generateAccessToken(id: number, email: string): Promise<string> {
    const payload = { id, email };
    return this.jwtService.sign(payload);
  }

  async sendVerificationEmail(id: number, recipient: string): Promise<void> {
    const retryOptions: Bull.JobOptions = {
      attempts: 3,
      timeout: 1000,
      backoff: {
        type: 'exponential',
        delay: 20_000, //ADD AN EXPONENTIAL DELAY OF 20SEC SO YOU DON'T OVERLOAD THE SERVER WITH CONCURENT TRIALS.
      },
    };


    // ADD JOB TO QUEUE
    await this.mailQueue.add(
      'send_verification_email',
      {
        id,
        recipient,
      },
      retryOptions,
    );
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
