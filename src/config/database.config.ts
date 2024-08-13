import { resolve } from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// export const database = (): TypeOrmModuleOptions => ({
//   type: 'better-sqlite3',
//   database: resolve(__dirname, '../../database.db'),
//   synchronize: true,
//   autoLoadEntities: true,
// });

export const database = (): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: '124.221.1.101',
  port: 3306,
  username: 'root',
  password: 'admin123',
  database: 'mall',
  synchronize: true,
  logging: true,
  autoLoadEntities: true,
  poolSize: 10,
  connectorPackage: 'mysql2',
});
