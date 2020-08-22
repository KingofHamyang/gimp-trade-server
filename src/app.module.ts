import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ScheduleModule } from '@nestjs/schedule'

import * as typeormConfig from './typeorm.config';

import { GimpsModule } from './gimps/gimps.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { join } from 'path';



@Module({
  imports: [
    GimpsModule,
    UsersModule,
    TasksModule,
    TypeOrmModule.forRoot(typeormConfig),
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    })
  ],
})
export class AppModule {}
