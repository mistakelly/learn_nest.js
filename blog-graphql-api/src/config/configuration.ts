import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { UserEntity } from '../modules/users/entities/users.entity';

// Load environment variables
config();

// Import path module
import * as path from 'path';
import { PostEntity } from 'src/modules/posts/entities/post.entity';
// Create a new ConfigService instance
const configService = new ConfigService();

// Explicitly create a DataSource instance for CLI
const AppDataSource = new DataSource({
  type: 'mysql',
  host: configService.get<string>('DB_HOSTNAME'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [UserEntity, PostEntity],
  migrations: [path.join(__dirname, '../database/migrations/*.{ts,js}')],
  migrationsTableName: 'migrations',
  logging: false,
  synchronize: true, // Disable sync when using migrations in production
});

export default AppDataSource;
