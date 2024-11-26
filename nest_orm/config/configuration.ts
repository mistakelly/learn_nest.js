import { DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from '../src/entity/User.entity';

config();

const configService = new ConfigService();


const AppDataSource: DataSourceOptions = {
  type: 'mysql',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get<string>('DATABASE_USERNAME'),
  password: process.env.DATABASE_PASSWORD,
  database: configService.get<string>('DATABASE_NAME'),
  synchronize: true,
  entities: [User],
  migrations: [],
  migrationsRun: false,
  // logging: true,
};

export default AppDataSource;
