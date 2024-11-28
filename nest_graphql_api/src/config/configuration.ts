import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { UserEntity } from 'src/entities/users.entity';

// call config method from dotenv as Nest.js ConfigService depends on it
config();
// instantiate ConfigService
const configService = new ConfigService();

const AppDataSource: DataSourceOptions = {
  type: 'mysql',
  host: configService.get<string>('DB_HOSTNAME'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  migrations: [],
  entities: [UserEntity],
  logging: false,
  synchronize: true,
};

export default AppDataSource;
