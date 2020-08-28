import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TradeLogsController } from './trade-logs.controller';
import { TradeLogsService } from './trade-logs.service';
import { TradeLog } from './trade-log.entity'
@Module({
  imports: [TypeOrmModule.forFeature([TradeLog])],
  controllers: [TradeLogsController],
  providers: [TradeLogsService]
})
export class TradeLogsModule {}
