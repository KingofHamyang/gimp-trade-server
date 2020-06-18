import {ConnectionOptions} from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: '34.64.173.19',
  port: 5432,
  username: 'gimp-trade',
  password: 'wX8YBskCUT',
  database: 'gimp-trade',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
}

export = config;