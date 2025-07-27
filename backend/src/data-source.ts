import 'dotenv/config';
import path from 'path';
import { DataSource } from 'typeorm';
import { Task } from './entities/Task';

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  synchronize: true,
  logging: true,

  entities: [Task],
  migrations: [],
  subscribers: [],
});