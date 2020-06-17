import { Module } from '@nestjs/common';
import { MarginsController } from './margins.controller';
import { MarginsService } from './margins.service';


@Module({
  controllers: [MarginsController],
  providers: [MarginsService],
})

export class MarginsModule {}
