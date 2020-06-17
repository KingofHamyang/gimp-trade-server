import { Module } from '@nestjs/common';
import { MarginsModule } from './margins/margins.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as typeormConfig from './typeorm.config';

@Module({
  imports: [
    MarginsModule,
    TypeOrmModule.forRoot(typeormConfig)
  ],
})
export class AppModule {}
