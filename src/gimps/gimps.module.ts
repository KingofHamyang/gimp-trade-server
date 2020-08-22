import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GimpsService } from './gimps.service';
import { GimpsController } from './gimps.controller';
import { Gimp } from './gimp.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Gimp])],
  controllers: [GimpsController],
  providers: [GimpsService],
})

export class GimpsModule {}
