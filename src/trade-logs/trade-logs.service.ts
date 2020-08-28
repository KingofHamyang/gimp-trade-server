import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TradeLog } from './trade-log.entity';
@Injectable()
export class TradeLogsService {
  constructor(
    @InjectRepository(TradeLog)
    private tradeLogRepository: Repository<TradeLog>,
  ) {}

  async addTradeLog(tradeLog: TradeLog){
    await this.tradeLogRepository.save(tradeLog)
  }
}
