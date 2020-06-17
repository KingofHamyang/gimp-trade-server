import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MarginsService } from './margins.service';
import { MarginsController } from './margins.controller';
import { Margin } from './margin.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Margin])],
  controllers: [MarginsController],
  providers: [MarginsService],
})

export class MarginsModule {}
