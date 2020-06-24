import { ConnectionOptions } from 'typeorm';
import { Config } from './utils/config';
const {
  DB_DATABASE,
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_PORT
} = Config;

const config: ConnectionOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
}

export = config;