import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { PasswordHashingService } from './services/password_hashing.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Constants } from 'src/constants';
import { UsersService } from 'src/users/users.service';
import { AuthEmailService } from 'src/common/services/email.service';
import { AppModule } from 'src/app.module';
import { BullModule } from '@nestjs/bull';
import { UserVerifyEmailProcessor } from 'src/common/services/consumers/email.consumer';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),

    PassportModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: Constants.SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),

    // BULL CONFIGURATION
    BullModule.forRoot({
      redis: {
        host: Constants.REDIS_HOST,
        port: Constants.REDIS_PORT,
      },
    }),

    BullModule.registerQueue({
      name: Constants.MAIL_QUEUE,
    }),
  ],

  providers: [
    AuthService,
    AuthEmailService,
    UserVerifyEmailProcessor,
    PasswordHashingService,
    UsersService,
  ],

  controllers: [AuthController],
})
export class AuthModule {}
