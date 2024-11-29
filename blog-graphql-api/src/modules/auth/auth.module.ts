import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/users.entity';

import { jwtConstants } from 'src/constants';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,

    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.register({
      secret: jwtConstants.secretKey,
      signOptions: { expiresIn: '1hr' },
    }),

    UsersModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [AuthService, AuthResolver, AccessTokenStrategy],
})
export class AuthModule {
  constructor() {}
}
