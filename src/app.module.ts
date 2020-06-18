import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import * as typeormConfig from './typeorm.config';

import { MarginsModule } from './margins/margins.module';
import { join } from 'path';



@Module({
  imports: [
    MarginsModule,
    TypeOrmModule.forRoot(typeormConfig),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    })
  ],
})
export class AppModule {}
