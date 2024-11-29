console.log('strategyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from 'src/constants';
import { JwtPayload } from 'src/shared/types/jwt-types';

console.log('jwt secret from strategy', jwtConstants.secretKey);
const configService = new ConfigService();

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secretKey,
      passReqToCallback: true,
    });

  }

  async validate(req: Request, payload: JwtPayload): Promise<JwtPayload> {
    return payload;
  }
}
