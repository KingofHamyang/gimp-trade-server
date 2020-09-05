import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TradeLog } from './trade-log.entity'
import { CreateTradeLogInterface } from './interface/create-trade-log.interface'

@Injectable()
export class TradeLogsService {
  constructor(
    @InjectRepository(TradeLog)
    private tradeLogRepository: Repository<TradeLog>,
  ) {}

  async findTradeLogs(): Promise<TradeLog[]> {
    return await this.tradeLogRepository
      .createQueryBuilder()
      .select()
      .getMany()
  }
  async createTradeLog(tradeLog: CreateTradeLogInterface): Promise<TradeLog> {
    return await this.tradeLogRepository.save(tradeLog)
  }
}
