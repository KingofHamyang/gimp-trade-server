import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ScheduleModule } from '@nestjs/schedule'

import * as typeormConfig from './typeorm.config';

import { MarginsModule } from './margins/margins.module';
import { TasksModule } from './tasks/tasks.module';
import { join } from 'path';



@Module({
  imports: [
    MarginsModule,
    TasksModule,
    TypeOrmModule.forRoot(typeormConfig),
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    })
  ],
})
export class AppModule {}
