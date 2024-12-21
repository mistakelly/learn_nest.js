import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from 'src/users/entities/user.entity';

// Load environment variables
config();

// Import path module
import * as path from 'path';
// Create a new ConfigService instance
const configService = new ConfigService();

// Explicitly create a DataSource instance for CLI
const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOSTNAME'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [User],
  migrations: [path.join(__dirname, '../database/migrations/*.{ts,js}')],
  migrationsTableName: 'migrations',
  logging: true,
  synchronize: true, // Disable sync when using migrations in production
});

export default AppDataSource;
