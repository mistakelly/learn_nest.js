import { ConfigService } from '@nestjs/config';
// TODO: READ WHY WE HAVE TO CALL THE config method before the configservice could work
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export const Constants = {
  SECRET_KEY: configService.get<string>('JWT_SECRET_KEY'),
  EMAIL_PASSWORD: configService.get<string>('EMAIL_PASSWORD'),
  EMAIL_USER: configService.get<string>('EMAIL_USER'),
  EMAIL_PORT: configService.get<number>('EMAIL_PORT'),
  EMAIL_HOST: configService.get<string>('EMAIL_HOST'),
  BASE_URL: configService.get<string>('BASE_URL'),
};
