import { ConfigService } from '@nestjs/config';

const configService =  new ConfigService()
export const jwtConstants = {
  secretKey: configService.get<string>('JWT_SECRET_KEY')
};
