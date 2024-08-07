import { resolve } from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const database = (): TypeOrmModuleOptions => ({
  type: 'better-sqlite3',
  database: resolve(__dirname, '../../database.db'),
  synchronize: true,
  autoLoadEntities: true,
});
